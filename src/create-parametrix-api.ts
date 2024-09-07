// create-parametrix-api.ts

import { setTimeout as sleep } from 'node:timers/promises';
import { readFile, writeFile } from 'node:fs/promises';
import Handlebars from 'handlebars';

interface tCfgObj {
	repoName: string;
	libName: string;
	designName: string;
	boilerplateSize: string;
}

async function oneFile(onePath: string, cfgObj: tCfgObj): Promise<void> {
	try {
		const fileIn = new URL(`../template/${onePath}.handlebars`, import.meta.url);
		const fileStr1 = await readFile(fileIn, { encoding: 'utf8' });
		//console.log(fileStr1);
		const template = Handlebars.compile(fileStr1);
		const fileStr2 = template(cfgObj);
		//console.log(fileStr2);
		await writeFile(`tmp/${onePath}`, fileStr2);
	} catch (err) {
		console.log(`err213: error while generating file ${onePath}`);
		console.error(err);
	}
}

async function generate_boirlerplate(
	repoName: string,
	libName: string,
	designName: string,
	boilerplateSize: string
): Promise<void> {
	const cfgObj: tCfgObj = {
		repoName: repoName,
		libName: libName,
		designName: designName,
		boilerplateSize: boilerplateSize
	};
	console.log(`boilerplate with
 repository name  : ${cfgObj.repoName}
 library name     : ${cfgObj.libName}
 design name      : ${cfgObj.designName}
 boilerplate size : ${cfgObj.boilerplateSize}`);
	oneFile('package.json', cfgObj);
	await sleep(500);
}

export { generate_boirlerplate };
