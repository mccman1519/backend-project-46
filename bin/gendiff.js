#!/usr/bin/env node
import { program } from "commander";
//import { version } from './../package.json';

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');


program.parse();