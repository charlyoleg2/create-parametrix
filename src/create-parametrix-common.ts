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

export type { tCfg1, tCfg2, tResp };
