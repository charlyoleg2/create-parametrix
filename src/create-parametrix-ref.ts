#!/usr/bin/env node
// create-parametrix-ref.ts

import { setTimeout as sleep } from 'node:timers/promises';
import { generate_boirlerplate } from './create-parametrix-api';
//import type { tCfg1, tResp } from './create-parametrix-common';
import type { tCfg1 } from './create-parametrix-common';
//import { firstLetterCapital, prefixOutputPath } from './create-parametrix-common';

// get optional preDir from command-line
const preDir = process.argv[2] || 'tmp2';
//console.log(`dbg019: preDir: ${preDir}`);

const argN = process.argv.length - 2;
if (argN > 1) {
	console.log(`warn376: ${argN} arguments provided but only one supported!`);
}

const kernelName = 'Blabla';
//const kernelName = '51';
const cfg1: tCfg1 = {
	repoName: `parame${kernelName}`,
	libName: `desi${kernelName}`,
	designName: 'myBox'
};
await generate_boirlerplate(cfg1, preDir);
await sleep(100); // for fun

// end of script
