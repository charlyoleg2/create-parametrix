#!/usr/bin/env node
// create-parametrix-cli.ts

import * as prom from '@clack/prompts';
import chalk from 'chalk';
import packag from '../package.json';
import { setTimeout as sleep } from 'node:timers/promises';
import { generate_boirlerplate } from './create-parametrix-api';
//import type { tCfg1, tResp } from './create-parametrix-common';
import type { tCfg1 } from './create-parametrix-common';
import { firstLetterCapital, prefixOutputPath } from './create-parametrix-common';

// first message
const firstMsg =
	`Create a new ${chalk.italic('parametrix')} project` +
	` with ${chalk.italic(packag.name)} version ${chalk.italic(packag.version)}`;

console.log(firstMsg);

// get optional kernel-name from command-line
const kernName = process.argv[2] || 'blabla';
//console.log(`dbg016: kernName: ${kernName}`);

const argN = process.argv.length - 2;
if (argN > 1) {
	console.log(`warn376: ${argN} arguments provided but only one supported!`);
}

// kernName with a capital first letter
const kernName2 = firstLetterCapital(kernName);

// questions
prom.intro(chalk.inverse(' Your new parametrix project '));
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
			})
	},
	{
		onCancel: () => {
			prom.cancel('Operation aborted!');
			process.exit(0);
		}
	}
);
prom.outro('Your new parametrix project will be boilerplated!');

const cfg1: tCfg1 = {
	repoName: pCfg.repoName,
	libName: pCfg.libName,
	designName: pCfg.designName
	//boilerplateSize: pCfg.boilerplateSize
};
const preDir = prefixOutputPath();
const resp = await generate_boirlerplate(cfg1, preDir);
await sleep(100);

// last message
function styl(str: string): string {
	const rStr = chalk.bold.cyan(str);
	return rStr;
}

//  4: ${styl(`inkscape pkg/${pCfg.libName}/src/myGroup1/svg/src_${pCfg.designName}.svg`)} (optional)
//  5: ${styl(`vim pkg/${pCfg.libName}/src/myGroup1/${pCfg.designName}.ts`)} (optional)
const lastMsg = `
Next steps:
  1: ${styl(`cd ${pCfg.repoName}`)}
  2: ${styl(`npm install`)}
  3: ${styl('git init && git add -A && git commit -m "Initial commit"')} (optional)
  4: ${styl(`${resp.inkscape}`)} (optional)
  5: ${styl(`${resp.vim}`)} (optional)
  6: ${styl(`npm run ci`)}
  7: ${styl(`npm run preview`)}
  8: ${styl(`npm run clean`)} (optional)
`;

console.log(lastMsg);

// end of script
