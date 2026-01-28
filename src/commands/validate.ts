import chalk from 'chalk';
import { loadTemplate } from '../utils/template-loader.js';
import { validateTemplate } from '../utils/validator.js';
import { glob } from 'glob';

interface ValidateOptions {
  strict?: boolean;
}

export async function validateCommand(files: string[], options: ValidateOptions) {
  console.log(chalk.blue.bold('\n🔍 Validating Templates\n'));

  try {
    let filesToValidate: string[];

    if (files.length > 0) {
      filesToValidate = files;
    } else {
      // Validate all templates
      filesToValidate = await glob('templates/**/*.md', {
        cwd: process.cwd(),
        ignore: ['**/node_modules/**', '**/dist/**', '**/_base-template.md'],
      });
    }

    if (filesToValidate.length === 0) {
      console.log(chalk.yellow('No templates found to validate.'));
      return;
    }

    let hasErrors = false;
    let validCount = 0;
    let warningCount = 0;

    for (const file of filesToValidate) {
      const template = await loadTemplate(file);
      const result = validateTemplate(template, options.strict);

      if (result.valid) {
        console.log(chalk.green(`✅ ${file}`));
        validCount++;
      } else {
        console.log(chalk.red(`❌ ${file}`));
        hasErrors = true;
      }

      if (result.errors.length > 0) {
        result.errors.forEach((error) => {
          console.log(chalk.red(`   Error: ${error}`));
        });
      }

      if (result.warnings.length > 0) {
        result.warnings.forEach((warning) => {
          console.log(chalk.yellow(`   Warning: ${warning}`));
        });
        warningCount++;
      }
    }

    console.log(chalk.blue.bold(`\n📊 Validation Results`));
    console.log(chalk.gray('─'.repeat(50)));
    console.log(`  Total files: ${filesToValidate.length}`);
    console.log(chalk.green(`  Valid: ${validCount}`));
    console.log(chalk.red(`  Invalid: ${filesToValidate.length - validCount}`));
    if (warningCount > 0) {
      console.log(chalk.yellow(`  With warnings: ${warningCount}`));
    }

    if (hasErrors) {
      console.log(chalk.red('\n❌ Validation failed\n'));
      process.exit(1);
    } else {
      console.log(chalk.green('\n✅ All templates are valid\n'));
      process.exit(0);
    }
  } catch (error) {
    console.error(chalk.red('Error during validation:'), error);
    process.exit(1);
  }
}
