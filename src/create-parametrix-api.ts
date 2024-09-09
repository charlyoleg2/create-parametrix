// create-parametrix-api.ts

import { setTimeout as sleep } from 'node:timers/promises';
import { readFile, writeFile, access, mkdir } from 'node:fs/promises';
import { dirname } from 'path';
import Handlebars from 'handlebars';
import type { tCfg1, tCfg2, tResp } from './create-parametrix-common';
import { firstLetterCapital } from './create-parametrix-common';
import { template_file_list } from './create-parametrix-list';

function prefixOutputPath() {
	let rPreDir = '.';
	const scriptDir = new URL('', import.meta.url).toString();
	//console.log(`dbg832: scriptDir: ${scriptDir}`);
	const regex = new RegExp('/node_modules/');
	if (!regex.test(scriptDir)) {
		rPreDir = './tmp';
	}
	return rPreDir;
}

async function oneFile(onePath: string, cfg2: tCfg2, preDir: string): Promise<void> {
	try {
		// compute read and write path
		const onePathIn = Handlebars.compile(onePath)({ libName: 'desiAbc', designName: 'myBox' });
		const onePathOut = Handlebars.compile(onePath)(cfg2);
		// try to read the file.handlebars. If it doesn"t exist, just copy the file
		const fileIn1 = new URL(`../template/${onePathIn}.handlebars`, import.meta.url);
		const fileIn2 = new URL(`../template/${onePathIn}`, import.meta.url);
		let fileStr1 = '';
		try {
			await access(fileIn1);
			fileStr1 = await readFile(fileIn1, { encoding: 'utf8' });
		} catch (err) {
			//console.log(err);
			if (err) {
				fileStr1 = await readFile(fileIn2, { encoding: 'utf8' });
			}
		}
		//console.log(fileStr1);
		// do the conversion
		const templateStr = Handlebars.compile(fileStr1);
		const fileStr2 = templateStr(cfg2);
		//console.log(fileStr2);
		const outPath = `${preDir}/${cfg2.repoName}/${onePathOut}`;
		// create missing output directory
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
		// write the output file
		await writeFile(outPath, fileStr2);
	} catch (err) {
		console.log(`err213: error while generating file ${onePath}`);
		console.error(err);
		throw `err214: error with path ${onePath}`;
	}
}

async function generate_boirlerplate(cfg1: tCfg1): Promise<tResp> {
	console.log(`Boilerplate with:
  repository name  : ${cfg1.repoName}
  library name     : ${cfg1.libName}
  design name      : ${cfg1.designName}`);
	const cfg2: tCfg2 = {
		repoName: cfg1.repoName,
		RepoName: firstLetterCapital(cfg1.repoName),
		libName: cfg1.libName,
		LibName: firstLetterCapital(cfg1.libName),
		designName: cfg1.designName,
		DesignName: firstLetterCapital(cfg1.designName)
	};
	const preDir = prefixOutputPath();
	for (const fpath of template_file_list) {
		await oneFile(fpath, cfg2, preDir);
	}
	console.log(`generate ${template_file_list.length} files in ${preDir}/${cfg1.repoName}/`);
	await sleep(100);
	const rResp: tResp = {
		inkscape: `inkscape ${cfg1.libName}/src/svg/src_${cfg1.designName}.svg`,
		vim: `vim ${cfg1.libName}/src/${cfg1.designName}.ts`
	};
	return rResp;
}

export { generate_boirlerplate };
