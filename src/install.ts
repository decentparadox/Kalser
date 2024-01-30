import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
import { exec } from "./exec";
import { os } from 'zx';
import { execSync } from "child_process";
import {handleUbuntu}  from "./scripts/ubuntu"
import {handleArch}  from "./scripts/arch"


async function install() {
	let osVersion = os.version(); 
	let osPlatform = os.platform(); 
	let osHomeDir = os.homedir();
	const desktopEnvironment = execSync('echo $XDG_CURRENT_DESKTOP', { encoding: 'utf-8' }).trim();
	const desktopSession = execSync('echo $DESKTOP_SESSION', { encoding: 'utf-8' }).trim();
	let desktopDistro = execSync("awk -F= '/PRETTY_NAME/ {print $2}' /etc/os-release	", { encoding: 'utf-8' }).trim();
	if (desktopDistro.toLowerCase().includes("ubuntu")) {
		desktopDistro = "ubuntu";
	}
	if (desktopDistro.toLowerCase().includes("arch")) {
		desktopDistro = "arch";
	}
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

	let SysInfo = `Username: ${os.userInfo().username} \nOS Version: ${osVersion}\nOS Platform: ${osPlatform}\nDesktop Session: ${desktopSession}\nDesktop Environment: ${desktopEnvironment} \nDesktop Distro: ${desktopDistro}`
	p.note(SysInfo, `${color.blue('System Info')}`);
	if (desktopDistro == "ubuntu"){await handleUbuntu()}
	if (desktopDistro == "arch"){await handleArch()}
	


}


export { install };