#!/usr/bin/env node
/* eslint-disable indent */
import { Command } from 'commander';
import path from 'path';
import diff from '../src/diff.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const diffResult = diff(
      path.resolve(process.cwd(), filepath1),
      path.resolve(process.cwd(), filepath2),
      program.opts().format,
    );

    console.log(diffResult);

    /*
    switch (program.opts().format) {
      case 'stylish': console.log(`${formatter.stylish(diffResult)}`);
        break;
      case 'plain': console.log(`${formatter.plain(diffResult)}`);
        break;
      case 'json': console.log(`${formatter.json(diffResult)}`);
        break;
      default:
        console.log(`Unrecognized option '${program.opts().format}'`);
         break;
    }
    */
  });

program.parse();
