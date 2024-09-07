// create-parametrix-api.ts

import { setTimeout as sleep } from 'node:timers/promises';

async function generate_boirlerplate(
	repoName: string,
	libName: string,
	designName: string,
	boilerplateSize: string
): Promise<void> {
	await sleep(500);
	console.log(
		`boilerplate repo ${repoName} lib ${libName} designName ${designName} boilerplateSize ${boilerplateSize}`
	);
}

export { generate_boirlerplate };
