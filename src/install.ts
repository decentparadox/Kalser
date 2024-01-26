import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
import { exec } from "./exec";
import { os } from 'zx';
const { execSync } = require('child_process');



async function install() {
	let osVersion = os.version(); 
	let osPlatform = os.platform(); 
	let osHomeDir = os.homedir();
	const desktopEnvironment = execSync('echo $XDG_CURRENT_DESKTOP', { encoding: 'utf-8' }).trim();
	const desktopSession = execSync('echo $DESKTOP_SESSION', { encoding: 'utf-8' }).trim();

	if (osPlatform !='linux' ){
		p.cancel(`De2De: \n Error: Cannot use De2De in ${color.bgRed(color.white(`${osVersion}`))} when you're expected to use it in 'linux' \n `)
		process.exit(0);
	}
	await exec(`clear`)
	console.clear();

	await setTimeout(1000);
	console.log(`
    ____  __.      .__                       
   |    |/ _|____  |  |   ______ ___________ 
   |      < \\__  \\ |  |  /  ___// __ \\_  __ \\
   |    |  \\ / __ \\|  |__\\___ \\\\  ___/|  | \\/
   |____|__ (____  /____/____  >\\___  >__|   
	   \\/    \\/          \\/     \\/       
   `);
   


	p.intro(`${color.bgCyan(color.black(' Kalser '))} ${color.bgCyan(color.black(' v0.0.1 '))}`);

	let SysInfo = `Username: ${os.userInfo().username} \nOS Version: ${osVersion}\nOS Platform: ${osPlatform}\nDesktop Session: ${desktopSession}\nDesktop Environment: ${desktopEnvironment}  `
	p.note(SysInfo, `${color.blue('System Info')}`);

	const project:any = await p.group(
		{
			theme: ({ results }) =>
				p.multiselect({
						message: `Hey ${os.userInfo().username}, let's start with themes you would like.`,
						// initialValues: [],
						options: [
								{ value: 'gruvbox', label: 'Gruvbox Dark', hint: 'recommended' },
								{ value: 'everforest', label: 'Everforest Dark', hint: 'recommended' },
								{ value: 'tokyonight', label: 'Tokyonight Storm' },
								{ value: 'nightfox', label: 'Nightfox Dusk' },
								{ value: 'kanagawa', label: 'Kanagawa' },
								{ value: 'catppuccin', label: 'Catppuccin Mocha' },
								{ value: 'material', label: 'Material Palenight' },
								{ value: 'rosepine', label: 'Rosepine Main' },
							],
						}),
				
				
			// template: ({results}) =>
			// 	p.select({
			// 		message: `Pick a template type within "${results.theme}"`,
			// 		initialValue: 'blank',
			// 		maxItems: 5,
			// 		options: [
			// 			{ value: 'blank', label: 'Just orca initialized',  hint: 'Recommended (Best for customizing)' },
			// 			{ value: 'OrcaBackground', label: 'OrcaBackground template' },
			// 			{ value: 'OrcaFont', label: 'OrcaFont template' },
			// 			{ value: 'OrcaTextures', label: 'OrcaTextures template' },
			// 			{ value: 'OrcaSick', label: 'OrcaSick template' },
			// 			{ value: 'OrcaMinimal', label: 'OrcaMinimal template', hint: 'oh no' },
			// 		],
			// 	}),
			// type: ({ results }) =>
			// 	p.select({
			// 		message: `Pick a project type within "${results.path}"`,
			// 		initialValue: 'ts',
			// 		maxItems: 5,
			// 		options: [
			// 			{ value: 'ts', label: 'TypeScript' },
			// 			{ value: 'js', label: 'JavaScript' },
			// 			{ value: 'rust', label: 'Rust' },
			// 			{ value: 'go', label: 'Go' },
			// 			{ value: 'python', label: 'Python' },
			// 			{ value: 'coffee', label: 'CoffeeScript', hint: 'oh no' },
			// 		],
			// 	}),
			// tools: () =>
			// 	p.multiselect({
			// 		message: 'Select additional tools.',
			// 		initialValues: ['prettier', 'eslint'],
			// 		options: [
			// 			{ value: 'prettier', label: 'Prettier', hint: 'recommended' },
			// 			{ value: 'eslint', label: 'ESLint', hint: 'recommended' },
			// 			{ value: 'stylelint', label: 'Stylelint' },
			// 			{ value: 'gh-action', label: 'GitHub Action' },
			// 		],
			// 	}),
			install: () =>
				p.confirm({
					message: 'Install dependencies?',
					initialValue: true,
				}),
		},
		{
			onCancel: () => {
				p.cancel('Operation cancelled.');
				process.exit(0);
			},
		}
	);

	if (project.install) {
		const s = p.spinner();
		s.start(`Installing `);
		// let selectedThemes = project.theme.split(',');


		// await exec(`mkdir ${project.theme}`);
		// await exec(`cd ${project.theme}`);
		await setTimeout(2500);
		s.stop('Installed Successfully!');
	}

	let nextSteps = `cd ${project.theme}        \n${project.install ? '' : 'pnpm install\n'}pnpm dev`;

	p.note(nextSteps, 'Next steps.');

	p.outro(`Problems? ${color.underline(color.cyan('https://example.com/issues'))}`);
}


export { install };