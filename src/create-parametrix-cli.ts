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
prom.intro(pc.inverse(' Questions for your new parametrix project!'));
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
				//		}),
				//	projectType: () => prom.select({
				//		message: 'Pick a project type.',
				//		options: [
				//			{ value: 'ts', label: 'TypeScript' },
				//			{ value: 'js', label: 'JavaScript' },
				//			{ value: 'coffee', label: 'CoffeeScript', hint: 'oh no' }
				//		]
			})
	},
	{
		onCancel: () => {
			prom.cancel('Operation cancelled!');
			process.exit(0);
		}
	}
);
prom.outro('Your new parametrix project will be created!');

await sleep(500);

// last message
const lastMsg = `
Next steps:
  1: ${pc.bold(pc.cyan(`cd ${pCfg.repoName}`))}
  2: ${pc.bold(pc.cyan(`npm install`))}
  3: ${pc.bold(pc.cyan('git init && git add -A && git commit -m "Initial commit"'))} (optional)
  4: ${pc.bold(pc.cyan(`inkscape desiBla/src/svg/src_cube.svg`))} (optional)
  5: ${pc.bold(pc.cyan(`vim desiBla/src/cube.ts`))} (optional)
  6: ${pc.bold(pc.cyan(`npm run ci`))}
  7: ${pc.bold(pc.cyan(`npm run preview`))}
  8: ${pc.bold(pc.cyan(`npm run clean`))}
`;

console.log(lastMsg);

// end of script
