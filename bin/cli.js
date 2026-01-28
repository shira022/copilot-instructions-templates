#!/usr/bin/env node

import { program } from 'commander';
import { listCommand } from '../dist/commands/list.js';
import { initCommand } from '../dist/commands/init.js';
import { validateCommand } from '../dist/commands/validate.js';

const packageJson = await import('../package.json', {
  assert: { type: 'json' }
}).then((m) => m.default);

program
  .name('copilot-instructions-templates')
  .description('CLI tool for managing GitHub Copilot instruction templates')
  .version(packageJson.version);

program
  .command('list')
  .description('List available templates')
  .option('-c, --category <category>', 'Filter by category (language, framework, role)')
  .option('-t, --tag <tag>', 'Filter by tag')
  .option('-d, --difficulty <difficulty>', 'Filter by difficulty (beginner, intermediate, advanced)')
  .action(listCommand);

program
  .command('init')
  .description('Initialize Copilot instructions in your project')
  .option('-o, --output <path>', 'Output path', '.github/copilot-instructions.md')
  .option('--no-interactive', 'Skip interactive prompts')
  .action(initCommand);

program
  .command('validate [files...]')
  .description('Validate template structure and metadata')
  .option('--strict', 'Enable strict validation')
  .action(validateCommand);

program.parse();
