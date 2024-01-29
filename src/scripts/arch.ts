import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
import { exec } from "../exec";
import { os } from 'zx';
import { execSync } from "child_process";

async function handleArch() {
    console.log("entered here")
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
export {handleArch}