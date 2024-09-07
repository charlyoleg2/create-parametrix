// create-parametrix-api.ts

import { setTimeout as sleep } from 'node:timers/promises';
import { readFile, writeFile, access, mkdir } from 'node:fs/promises';
import { dirname } from 'path';
import Handlebars from 'handlebars';
import type { tCfgObj, tResp } from './create-parametrix-common';
//import { c_boilerplateSize_S, c_boilerplateSize_M, c_boilerplateSize_L } from './create-parametrix-common';

async function oneFile(onePath: string, cfgObj: tCfgObj): Promise<void> {
	try {
		const fileIn = new URL(`../template/${onePath}.handlebars`, import.meta.url);
		const fileStr1 = await readFile(fileIn, { encoding: 'utf8' });
		//console.log(fileStr1);
		const template = Handlebars.compile(fileStr1);
		const fileStr2 = template(cfgObj);
		//console.log(fileStr2);
		const outPath = `tmp/${cfgObj.repoName}/${onePath}`;
		const outDir = dirname(outPath);
		try {
			await access(outDir);
		} catch (err) {
			console.log(`create the directory ${outDir}`);
			//console.log(err);
			if (err) {
				await mkdir(outDir, { recursive: true });
			}
		}
		await writeFile(outPath, fileStr2);
	} catch (err) {
		console.log(`err213: error while generating file ${onePath}`);
		console.error(err);
	}
}

async function generate_boirlerplate(cfgObj: tCfgObj): Promise<tResp> {
	console.log(`Boilerplate with:
  repository name  : ${cfgObj.repoName}
  library name     : ${cfgObj.libName}
  design name      : ${cfgObj.designName}
  boilerplate size : ${cfgObj.boilerplateSize}`);
	oneFile('package.json', cfgObj);
	await sleep(500);
	const rResp: tResp = {
		inkscape: `inkscape ${cfgObj.libName}/src/svg/src_${cfgObj.designName}.svg`,
		vim: `vim ${cfgObj.libName}/src/${cfgObj.designName}.ts`
	};
	return rResp;
}

export { generate_boirlerplate };
