import chalk from 'chalk';
import { loadTemplates, filterTemplates } from '../utils/template-loader.js';
import type { Template } from '../types/template.js';

interface ListOptions {
  category?: string;
  tag?: string;
  difficulty?: string;
}

export async function listCommand(options: ListOptions) {
  console.log(chalk.blue.bold('\n📚 GitHub Copilot Instruction Templates\n'));

  try {
    const templates = await loadTemplates();
    const filtered = filterTemplates(templates, options);

    if (filtered.length === 0) {
      console.log(chalk.yellow('No templates found matching the criteria.'));
      return;
    }

    // Group by category
    const grouped = filtered.reduce(
      (acc, template) => {
        const category = template.frontmatter?.category || 'unknown';
        if (!acc[category]) acc[category] = [];
        acc[category].push(template);
        return acc;
      },
      {} as Record<string, Template[]>
    );

    // Display templates by category
    for (const [category, categoryTemplates] of Object.entries(grouped)) {
      console.log(chalk.green.bold(`\n${category.toUpperCase()}S`));
      console.log(chalk.gray('─'.repeat(50)));

      for (const template of categoryTemplates) {
        const difficultyIcon = getDifficultyIcon(template.frontmatter?.difficulty);
        const title = template.frontmatter?.title || template.filename;
        const tags = template.frontmatter?.tags?.slice(0, 3).join(', ') || '';

        console.log(`\n${difficultyIcon} ${chalk.cyan.bold(title)}`);
        console.log(`  ${chalk.gray('ID:')} ${template.id}`);
        if (tags) {
          console.log(`  ${chalk.gray('Tags:')} ${tags}`);
        }
        if (template.frontmatter?.primaryTech) {
          console.log(`  ${chalk.gray('Tech:')} ${template.frontmatter.primaryTech}`);
        }
        console.log(`  ${chalk.gray('Path:')} ${template.path}`);
      }
    }

    console.log(chalk.blue.bold(`\n\n📊 Total: ${filtered.length} template(s)\n`));

    // Show usage hint
    console.log(chalk.gray('Usage:'));
    console.log(chalk.gray('  copilot-instructions-templates init     # Initialize in your project'));
    console.log(
      chalk.gray('  copilot-instructions-templates list --category=framework # Filter by category')
    );
    console.log(chalk.gray('  copilot-instructions-templates validate  # Validate templates\n'));
  } catch (error) {
    console.error(chalk.red('Error loading templates:'), error);
    process.exit(1);
  }
}

function getDifficultyIcon(difficulty?: string): string {
  switch (difficulty) {
    case 'beginner':
      return '⭐';
    case 'intermediate':
      return '⭐⭐';
    case 'advanced':
      return '⭐⭐⭐⭐';
    default:
      return '📄';
  }
}
