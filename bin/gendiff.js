#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import diff from '../src/diff.js';
import * as formatter from '../src/formatter/formatter.js';

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
    );
    
    switch (program.opts().format) {
      case 'stylish': console.log(`\n{${formatter.stylish(diffResult)}\n}`);
        break;
      default:
         break;
    }
  });

program.parse();
