// create-parametrix-api.ts

import { setTimeout as sleep } from 'node:timers/promises';
import { readFile, writeFile, access, mkdir } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import { dirname, extname } from 'path';
import Handlebars from 'handlebars';
import type { tCfg1, tCfg2, tResp } from './create-parametrix-common';
import { firstLetterCapital, underline } from './create-parametrix-common';
import { template_file_list } from './create-parametrix-list';

async function createMissingDir(outPath: string): Promise<void> {
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
}

function isFileBinary(fpath: URL): boolean {
	const binaryExts = new Set(['.png']);
	const infileExt = extname(fpath.toString());
	const rBool = binaryExts.has(infileExt);
	//if (rBool) {
	//	console.log(`dbg732: file ${fpath.toString()} is a binary file`);
	//}
	return rBool;
}

async function oneFile(onePath: string, cfg2: tCfg2, preDir: string): Promise<void> {
	try {
		// compute read and write path
		const onePathIn = Handlebars.compile(onePath)({ libName: 'desiAbc', designName: 'myBox' });
		const onePathOut = Handlebars.compile(onePath)(cfg2);
		// try to read the file.handlebars. If it doesn"t exist, just copy the file
		const fileIn1 = new URL(`./template/${onePathIn}.handlebars`, import.meta.url);
		const fileIn2 = new URL(`./template/${onePathIn}`, import.meta.url);
		let fileBin = false;
		let fileStr2 = '';
		let fileBuffer2 = Buffer.alloc(0);
		try {
			await access(fileIn1);
			try {
				const fileStr1 = await readFile(fileIn1, { encoding: 'utf8' });
				//console.log(fileStr1);
				// do the conversion
				const templateStr = Handlebars.compile(fileStr1);
				fileStr2 = templateStr(cfg2);
			} catch (err) {
				console.log(`err392: error while processing ${fileIn1.toString()}`);
				console.log(err);
			}
		} catch (err) {
			//console.log(err);
			if (err) {
				if (isFileBinary(fileIn2)) {
					fileBin = true;
					fileBuffer2 = await readFile(fileIn2);
				} else {
					fileStr2 = await readFile(fileIn2, { encoding: 'utf8' });
				}
			}
		}
		//console.log(fileStr2);
		const outPath = `${preDir}/${cfg2.repoName}/${onePathOut}`;
		await createMissingDir(outPath);
		// write the output file\
		if (fileBin) {
			await writeFile(outPath, fileBuffer2);
		} else {
			await writeFile(outPath, fileStr2);
		}
	} catch (err) {
		console.log(`err213: error while generating file ${onePath}`);
		console.error(err);
		throw `err214: error with path ${onePath}`;
	}
}

async function generate_boirlerplate(cfg1: tCfg1, preDir: string): Promise<tResp> {
	console.log(`Boilerplate with:
  repository name  : ${cfg1.repoName}
  library name     : ${cfg1.libName}
  design name      : ${cfg1.designName}`);
	const cfg2: tCfg2 = {
		repoName: cfg1.repoName,
		RepoName: firstLetterCapital(cfg1.repoName),
		RepoNameUnderline: underline(cfg1.repoName),
		libName: cfg1.libName,
		LibName: firstLetterCapital(cfg1.libName),
		LibNameUnderline: underline(cfg1.libName),
		designName: cfg1.designName,
		DesignName: firstLetterCapital(cfg1.designName),
		DesignNameUnderline: underline(cfg1.designName)
	};
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
