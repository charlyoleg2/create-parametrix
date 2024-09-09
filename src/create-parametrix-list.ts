// create-parametrix-list.ts

const template_file_list = [
	'.editorconfig',
	'.gitignore',
	'.npmrc',
	'package.json',
	'README.md',
	'pkg/{{libName}}/src/myGroup1/voila.ts',
	'pkg/{{libName}}/src/myGroup1/{{designName}}.ts'
];

export { template_file_list };
