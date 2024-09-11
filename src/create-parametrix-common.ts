// create-parametrix-common.ts

interface tCfg1 {
	repoName: string;
	libName: string;
	designName: string;
	//boilerplateSize: string;
}
interface tCfg2 {
	repoName: string;
	RepoName: string;
	libName: string;
	LibName: string;
	designName: string;
	DesignName: string;
}
interface tResp {
	inkscape: string;
	vim: string;
}

function firstLetterCapital(str: string): string {
	const rStr = str.charAt(0).toUpperCase() + str.slice(1);
	return rStr;
}

function prefixOutputPath(): string {
	let rPreDir = '.';
	const scriptDir = new URL('', import.meta.url).toString();
	//console.log(`dbg832: scriptDir: ${scriptDir}`);
	const regex = new RegExp('/node_modules/');
	if (!regex.test(scriptDir)) {
		rPreDir = './tmp';
	}
	return rPreDir;
}

export type { tCfg1, tCfg2, tResp };
export { firstLetterCapital, prefixOutputPath };
