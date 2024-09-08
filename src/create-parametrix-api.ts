// create-parametrix-api.ts

import { setTimeout as sleep } from 'node:timers/promises';
import { readFile, writeFile, access, mkdir } from 'node:fs/promises';
import { dirname } from 'path';
import Handlebars from 'handlebars';
import type { tCfgObj, tCfgObj2, tResp } from './create-parametrix-common';
//import { c_boilerplateSize_S, c_boilerplateSize_M, c_boilerplateSize_L } from './create-parametrix-common';

async function oneFile(onePath: string, cfgObj: tCfgObj2): Promise<void> {
	try {
		const onePathIn = Handlebars.compile(onePath)({ libName: 'desiAbc', designName: 'myBox' });
		const onePathOut = Handlebars.compile(onePath)(cfgObj);
		const fileIn = new URL(`../template/${onePathIn}.handlebars`, import.meta.url);
		const fileStr1 = await readFile(fileIn, { encoding: 'utf8' });
		//console.log(fileStr1);
		const templateStr = Handlebars.compile(fileStr1);
		const fileStr2 = templateStr(cfgObj);
		//console.log(fileStr2);
		let preDir = '.';
		const scriptDir = new URL('', import.meta.url).toString();
		//console.log(`dbg832: scriptDir: ${scriptDir}`);
		const regex = new RegExp('/node_modules/');
		if (!regex.test(scriptDir)) {
			preDir = './tmp';
		}
		const outPath = `${preDir}/${cfgObj.repoName}/${onePathOut}`;
		const outDir = dirname(outPath);
		try {
			await access(outDir);
		} catch (err) {
			//console.log(`create the directory ${outDir}`);
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
  design name      : ${cfgObj.designName}`);
	const cfgObj2: tCfgObj2 = {
		repoName: cfgObj.repoName,
		RepoName: cfgObj.repoName.charAt(0).toUpperCase() + cfgObj.repoName.slice(1),
		libName: cfgObj.libName,
		LibName: cfgObj.libName.charAt(0).toUpperCase() + cfgObj.libName.slice(1),
		designName: cfgObj.designName,
		DesignName: cfgObj.designName.charAt(0).toUpperCase() + cfgObj.designName.slice(1)
	};
	oneFile('.editorconfig', cfgObj2);
	oneFile('.gitignore', cfgObj2);
	oneFile('.npmrc', cfgObj2);
	oneFile('package.json', cfgObj2);
	oneFile('README.md', cfgObj2);
	oneFile('pkg/{{libName}}/src/myGroup1/voila.ts', cfgObj2);
	oneFile('pkg/{{libName}}/src/myGroup1/{{designName}}.ts', cfgObj2);
	await sleep(500);
	const rResp: tResp = {
		inkscape: `inkscape ${cfgObj.libName}/src/svg/src_${cfgObj.designName}.svg`,
		vim: `vim ${cfgObj.libName}/src/${cfgObj.designName}.ts`
	};
	return rResp;
}

export { generate_boirlerplate };
