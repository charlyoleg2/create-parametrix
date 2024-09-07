// create-parametrix-common.ts

interface tCfgObj {
	repoName: string;
	libName: string;
	designName: string;
	boilerplateSize: string;
}
interface tResp {
	inkscape: string;
	vim: string;
}

const c_boilerplateSize_S = 'boilerplateS';
const c_boilerplateSize_M = 'boilerplateM';
const c_boilerplateSize_L = 'boilerplateL';

export type { tCfgObj, tResp };
export { c_boilerplateSize_S, c_boilerplateSize_M, c_boilerplateSize_L };
