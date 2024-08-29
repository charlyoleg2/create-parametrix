#!/usr/bin/env node
// create-parametrix-cli.ts

import * as prom from '@clack/prompts';
import pc from 'picocolors';
import packag from '../package.json';
import { setTimeout as sleep } from 'node:timers/promises';

// first message
const firstMsg =
	`Create a new ${pc.italic('parametrix')} project` +
	` with ${pc.italic(packag.name)} version ${pc.italic(packag.version)}`;

console.log(firstMsg);

// get optional kernel-name from command-line
const kernName = process.argv[2] || 'blabla';
//console.log(`dbg016: kernName: ${kernName}`);

const argN = process.argv.length - 2;
if (argN > 1) {
	console.log(`warn376: ${argN} arguments provided but only one supported!`);
}

// kernName with a capital first letter
const kernName2 = kernName.charAt(0).toUpperCase() + kernName.slice(1);

// questions
prom.intro(pc.inverse(' Your new parametrix project '));
/* eslint-disable @typescript-eslint/no-invalid-void-type */
const pCfg = await prom.group(
	{
		repoName: () =>
			prom.text({
				message: 'What is the repository name?',
				initialValue: `parame${kernName2}`
				//placeholder: `parame${kernName2}`
			}),
		shouldContinue: () =>
			prom.confirm({
				message: 'Do you want to continue?'
			}),
		projectType: () =>
			prom.select({
				message: 'Pick a project type.',
				options: [
					{ value: 'ts' as unknown as void, label: 'TypeScript' },
					{ value: 'js' as unknown as void, label: 'JavaScript' },
					{ value: 'coffee' as unknown as void, label: 'CoffeeScript', hint: 'oh no' }
				]
			})
	},
	{
		onCancel: () => {
			prom.cancel('Operation aborted!');
			process.exit(0);
		}
	}
);
/* eslint-enable @typescript-eslint/no-invalid-void-type */
prom.outro('Your new parametrix project will be boilerplated!');

await sleep(500);

// last message
function styl(str: string): string {
	const rStr = pc.bold(pc.cyan(str));
	return rStr;
}

const lastMsg = `Next steps:
  1: ${styl(`cd ${pCfg.repoName}`)}
  2: ${styl(`npm install`)}
  3: ${styl('git init && git add -A && git commit -m "Initial commit"')} (optional)
  4: ${styl(`inkscape desiBla/src/svg/src_cube.svg`)} (optional)
  5: ${styl(`vim desiBla/src/cube.ts`)} (optional)
  6: ${styl(`npm run ci`)}
  7: ${styl(`npm run preview`)}
  8: ${styl(`npm run clean`)} (optional)
`;

console.log(lastMsg);

// end of script
