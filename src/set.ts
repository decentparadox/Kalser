import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
import { exec } from "./exec";
import { os } from 'zx';


async function set() {
    console.clear();
    p.intro(`${color.bgCyan(color.black(' De2De '))} ${color.bgCyan(color.black(' v0.0.1 '))}`);

    const setTheme:any = await p.group(
        {
            theme: ({ results }) => 
            p.select({
                message: `Pick a theme within `,
                initialValue: 'blank',
                maxItems: 5,
                options: [
                    { value: 'Gruvbox-Dark-B', label: 'Gruvbox Dark'},
                    { value: 'Everforest-Dark-B', label: 'Everforest Dark' },
					{ value: 'Tokyonight-Storm-B', label: 'Tokyonight Storm' },
					{ value: 'Nightfox-Dusk-B', label: 'Nightfox Dusk' },
					{ value: 'Kanagawa-B', label: 'Kanagawa' },
					{ value: 'Catppuccin-Mocha-B', label: 'Catppuccin Mocha' },
					{ value: 'Material-Palenight-B', label: 'Material Palenight' },
					{ value: 'RosePine-Main-B', label: 'Rosepine Main' },
                ],
            }),
            
        },
        {
			onCancel: () => {
				p.cancel('Operation cancelled.');
				process.exit(0);
			},
		}

    )
    await exec(`gsettings set org.gnome.desktop.interface gtk-theme ${setTheme.theme} `);
    await exec(`gsettings set org.gnome.desktop.interface icon-theme ${setTheme.theme} `);
    await exec(`dconf write /org/gnome/shell/extensions/user-theme/name "'${setTheme.theme}'" `);
    await exec(`gsettings set org.gnome.desktop.background picture-uri /usr/share/walls/${setTheme.theme}.png  `);



    let cngrts = `Congratulations, you have successfully set your theme to ${setTheme.theme}!`;

	p.note(cngrts, 'Wooo, Hurrah! ✨ 🎉 ');
}

export { set };