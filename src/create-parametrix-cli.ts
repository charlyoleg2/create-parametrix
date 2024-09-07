#!/usr/bin/env node
// create-parametrix-cli.ts

import * as prom from '@clack/prompts';
import pc from 'picocolors';
import packag from '../package.json';
import { setTimeout as sleep } from 'node:timers/promises';
import { generate_boirlerplate } from './create-parametrix-api';

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
				message: 'Name of the repository?',
				initialValue: `parame${kernName2}`
				//placeholder: `parame${kernName2}`
			}),
		libName: () =>
			prom.text({
				message: 'Name of the (first) library?',
				initialValue: `desi${kernName2}`
				//placeholder: `desi${kernName2}`
			}),
		designName: () =>
			prom.text({
				message: 'Name of the (first) design?',
				initialValue: `myBox`
				//placeholder: `myBox`
			}),
		//shouldContinue: () =>
		//	prom.confirm({
		//		message: 'Do you want to continue?'
		//	}),
		boilerplateSize: () =>
			prom.select({
				message: 'Pick a project type.',
				options: [
					{
						value: 'boilerplateS' as unknown as void,
						label: 'simplest boilerplate',
						hint: 'up to 10 designs'
					},
					{
						value: 'boilerplateM' as unknown as void,
						label: 'boilerplate with sub-directories',
						hint: 'up to 50 designs'
					},
					{
						value: 'boilerplateL' as unknown as void,
						label: 'boilerplare with sub-libraries and sub-directories',
						hint: 'more than 50 designs'
					}
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

await generate_boirlerplate(pCfg.repoName, pCfg.libName, pCfg.designName, pCfg.boilerplateSize);
await sleep(100);

// last message
function styl(str: string): string {
	const rStr = pc.bold(pc.cyan(str));
	return rStr;
}

const lastMsg = `Next steps:
  1: ${styl(`cd ${pCfg.repoName}`)}
  2: ${styl(`npm install`)}
  3: ${styl('git init && git add -A && git commit -m "Initial commit"')} (optional)
  4: ${styl(`inkscape ${pCfg.libName}/src/svg/src_${pCfg.designName}.svg`)} (optional)
  5: ${styl(`vim ${pCfg.libName}/src/${pCfg.designName}.ts`)} (optional)
  6: ${styl(`npm run ci`)}
  7: ${styl(`npm run preview`)}
  8: ${styl(`npm run clean`)} (optional)
`;

console.log(lastMsg);

// end of script
