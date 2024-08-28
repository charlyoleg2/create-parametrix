#!/usr/bin/env node
// create-parametrix-cli.ts

import { intro, outro, confirm, select, spinner, isCancel, cancel, text } from '@clack/prompts';
import pc from 'picocolors';
import packag from '../package.json';
import { setTimeout as sleep } from 'node:timers/promises';

// first message
const firstMsg =
	`Create a new ${pc.italic('parametrix')} project` +
	` with ${pc.italic(packag.name)} version ${pc.italic(packag.version)}`;

console.log(firstMsg);

// get optional kernel-name from command-line
const kernName = process.argv[2] || 'blabla';
//console.log(`dbg016: kernName: ${kernName}`);

const argN = process.argv.length - 2;
if (argN > 1) {
	console.log(`warn376: ${argN} arguments provided but only one supported!`);
}

// questions
async function questions() {
	console.log();
	intro(pc.inverse(' create-my-app '));

	const name = await text({
		message: 'What is your name?',
		placeholder: 'Anonymous'
	});

	if (isCancel(name)) {
		cancel('Operation cancelled');
		return process.exit(0);
	}

	const shouldContinue = await confirm({
		message: 'Do you want to continue?'
	});

	if (isCancel(shouldContinue)) {
		cancel('Operation cancelled');
		return process.exit(0);
	}

	const projectType = await select({
		message: 'Pick a project type.',
		options: [
			{ value: 'ts', label: 'TypeScript' },
			{ value: 'js', label: 'JavaScript' },
			{ value: 'coffee', label: 'CoffeeScript', hint: 'oh no' }
		]
	});

	if (isCancel(projectType)) {
		cancel('Operation cancelled');
		return process.exit(0);
	}

	const s = spinner();
	s.start('Installing via npm');

	await sleep(2000);

	s.stop('Installed via npm');

	outro("You're all set!");

	await sleep(1000);
}

await questions().catch(console.error);

const repoName = `parame${kernName}`;

// last message
const lastMsg = `
Next steps:
  1: ${pc.bold(pc.cyan(`cd ${repoName}`))}
  2: ${pc.bold(pc.cyan(`npm install`))}
  3: ${pc.bold(pc.cyan('git init && git add -A && git commit -m "Initial commit"'))} (optional)
  4: ${pc.bold(pc.cyan(`inkscape desiBla/src/svg/src_cube.svg`))} (optional)
  5: ${pc.bold(pc.cyan(`vim desiBla/src/cube.ts`))} (optional)
  6: ${pc.bold(pc.cyan(`npm run ci`))}
  7: ${pc.bold(pc.cyan(`npm run preview`))}
  8: ${pc.bold(pc.cyan(`npm run clean`))}
`;

console.log(lastMsg);

// end of script
