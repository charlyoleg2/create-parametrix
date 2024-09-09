// create-parametrix-list.ts

const template_file_list = [
	'.editorconfig',
	'.gitignore',
	'.npmrc',
	'package.json',
	'README.md',
	'.github/workflows/build_and_deploy.yml',
	'pkg/{{libName}}/eslint.config.js',
	'pkg/{{libName}}/.gitignore',
	'pkg/{{libName}}/.prettierignore',
	'pkg/{{libName}}/.prettierrc',
	'pkg/{{libName}}/tsconfig.json',
	'pkg/{{libName}}/vitest.config.ts',
	'pkg/{{libName}}/svgo.config.js',
	'pkg/{{libName}}/README.md',
	'pkg/{{libName}}/package.json',
	'pkg/{{libName}}/src/index.ts',
	'pkg/{{libName}}/src/myGroup1/voila.ts',
	'pkg/{{libName}}/src/myGroup1/voila.test.ts',
	'pkg/{{libName}}/src/myGroup1/{{designName}}.ts',
	'pkg/{{libName}}/src/myGroup1/svg/src_voila.svg',
	'pkg/{{libName}}/src/myGroup1/svg/voila_face.svg',
	'pkg/{{libName}}-cli/.gitignore',
	'pkg/{{libName}}-cli/.prettierignore',
	'pkg/{{libName}}-cli/.prettierrc',
	'pkg/{{libName}}-cli/eslint.config.js',
	'pkg/{{libName}}-cli/tsconfig.json',
	'pkg/{{libName}}-cli/vitest.config.ts',
	'pkg/{{libName}}-cli/README.md',
	'pkg/{{libName}}-cli/package.json',
	'pkg/{{libName}}-cli/src/designList.ts',
	'pkg/{{libName}}-cli/src/versions.json',
	'pkg/{{libName}}-cli/src/desiXY-cli.ts',
	'pkg/{{libName}}-cli/src/desiXY-cli.test.ts',
	'pkg/{{libName}}-cli/test/test1.bats',
	'pkg/{{libName}}-uis/.gitignore',
	'pkg/{{libName}}-uis/.prettierignore',
	'pkg/{{libName}}-uis/eslint.config.js',
	'pkg/{{libName}}-uis/tsconfig.json',
	'pkg/{{libName}}-uis/README.md',
	'pkg/{{libName}}-uis/package.json',
	'pkg/{{libName}}-uis/src/desiXY-uis.ts',
	'pkg/{{libName}}-uis/src/desiXY-uis.test.ts',
	'pkg/{{libName}}-ui/.gitignore',
	'pkg/{{libName}}-ui/.prettierignore',
	'pkg/{{libName}}-ui/.prettierrc',
	'pkg/{{libName}}-ui/eslint.config.js',
	'pkg/{{libName}}-ui/tsconfig.json',
	'pkg/{{libName}}-ui/svelte.config.js',
	'pkg/{{libName}}-ui/vite.config.ts',
	'pkg/{{libName}}-ui/README.md',
	'pkg/{{libName}}-ui/package.json',
	//'pkg/{{libName}}-ui/static/favicon.png',
	'pkg/{{libName}}-ui/static/favicon.svg',
	'pkg/{{libName}}-ui/src/app.d.ts',
	'pkg/{{libName}}-ui/src/app.html',
	'pkg/{{libName}}-ui/src/index.test.ts',
	'pkg/{{libName}}-ui/src/lib/designList.ts',
	'pkg/{{libName}}-ui/src/lib/gen_colors.scss',
	'pkg/{{libName}}-ui/src/lib/general.ts',
	'pkg/{{libName}}-ui/src/lib/makeList.ts',
	'pkg/{{libName}}-ui/src/lib/versions.json',
	'pkg/{{libName}}-ui/src/routes/+layout.ts',
	'pkg/{{libName}}-ui/src/routes/+layout.svelte',
	'pkg/{{libName}}-ui/src/routes/+page.svelte',
	'pkg/{{libName}}-ui/src/routes/[...design]/+page.ts',
	'pkg/{{libName}}-ui/src/routes/[...design]/+page.svelte'
];

export { template_file_list };
