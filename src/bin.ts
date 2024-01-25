#!/usr/bin/env node

import "zx/globals";
import { Command } from "commander";
import { install } from "./install";
import {set } from "./set";


const program = new Command();
program.version("0.0.1");
program
  .command("install")
  .option("-o, --orca", "use pnpm for installation")
  .action(install);

program.command("set").action(set);
program.parse(process.argv);

