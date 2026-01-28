# CLI Usage Guide

This guide covers how to use the `copilot-instructions-templates` CLI tool to manage GitHub Copilot instructions in your projects.

## Installation

### Global Installation (Recommended)

```bash
npm install -g @github-copilot/instruction-templates
```

### Using npx (No Installation Required)

```bash
npx @github-copilot/instruction-templates <command>
```

### Local Installation (For Development)

```bash
npm install @github-copilot/instruction-templates --save-dev
```

## Commands

### `list` - List Available Templates

Display all available templates with filtering options.

#### Basic Usage

```bash
# List all templates
copilot-instructions-templates list

# Using npx
npx @github-copilot/instruction-templates list
```

#### Filtering Options

```bash
# Filter by category
copilot-instructions-templates list --category=language
copilot-instructions-templates list --category=framework
copilot-instructions-templates list --category=role

# Filter by tag
copilot-instructions-templates list --tag=frontend
copilot-instructions-templates list --tag=security
copilot-instructions-templates list --tag=typescript

# Filter by difficulty
copilot-instructions-templates list --difficulty=beginner
copilot-instructions-templates list --difficulty=intermediate
copilot-instructions-templates list --difficulty=advanced

# Combine filters
copilot-instructions-templates list --category=framework --tag=frontend
```

#### Example Output

```
📚 GitHub Copilot Instruction Templates

LANGUAGES
──────────────────────────────────────────────────

⭐⭐ TypeScript - GitHub Copilot Instructions
  ID: typescript
  Tags: typescript, javascript, nodejs
  Tech: TypeScript 5.3+
  Path: templates/languages/typescript.md

⭐⭐ Python - GitHub Copilot Instructions
  ID: python
  Tags: python, poetry, pytest
  Tech: Python 3.12+
  Path: templates/languages/python.md

FRAMEWORKS
──────────────────────────────────────────────────

⭐⭐⭐⭐ Next.js - GitHub Copilot Instructions
  ID: nextjs
  Tags: nextjs, react, ssr
  Tech: Next.js 14+
  Path: templates/frameworks/nextjs.md

📊 Total: 11 template(s)
```

---

### `init` - Initialize Copilot Instructions

Create a `.github/copilot-instructions.md` file in your project by selecting and combining templates.

#### Interactive Mode (Default)

```bash
# Navigate to your project root
cd /path/to/your/project

# Run init command
copilot-instructions-templates init
```

This will:
1. Display a list of available templates
2. Allow you to select multiple templates using checkboxes
3. Combine selected templates into a single file
4. Create `.github/copilot-instructions.md`

#### Custom Output Path

```bash
# Specify custom output path
copilot-instructions-templates init --output=.copilot/instructions.md

# Save to a different location
copilot-instructions-templates init --output=docs/copilot-setup.md
```

#### Non-Interactive Mode

```bash
# Skip prompts (requires predefined template list)
copilot-instructions-templates init --no-interactive
```

#### Example Interactive Session

```
🚀 Initialize GitHub Copilot Instructions

? Select templates to combine:
❯◉ TypeScript - GitHub Copilot Instructions (typescript)
 ◉ Next.js - GitHub Copilot Instructions (nextjs)
 ◯ Python - GitHub Copilot Instructions (python)
 ◉ Security Expert - GitHub Copilot Instructions (security-expert)
 ◯ Test Engineer - GitHub Copilot Instructions (test-engineer)

✅ Created: .github/copilot-instructions.md

Selected templates: typescript, nextjs, security-expert

Next steps:
  1. Review and customize the generated instructions
  2. Commit the file to your repository
  3. Start using GitHub Copilot with your custom instructions!
```

---

### `validate` - Validate Templates

Validate template structure and metadata to ensure they meet quality standards.

#### Validate All Templates

```bash
copilot-instructions-templates validate
```

#### Validate Specific Files

```bash
# Single file
copilot-instructions-templates validate templates/languages/typescript.md

# Multiple files
copilot-instructions-templates validate templates/languages/*.md

# With glob pattern
copilot-instructions-templates validate "templates/**/*.md"
```

#### Strict Mode

Enable strict validation (treats warnings as errors):

```bash
copilot-instructions-templates validate --strict
```

#### Example Output

```
🔍 Validating Templates

✅ templates/languages/typescript.md
❌ templates/languages/python.md
   Error: Missing required field: difficulty
   Warning: No frontmatter found (will be added in Phase 4)
✅ templates/frameworks/nextjs.md
⚠️  templates/roles/security-expert.md
   Warning: Field "tags" is empty

📊 Validation Results
──────────────────────────────────────────────────
  Total files: 4
  Valid: 2
  Invalid: 1
  With warnings: 2

❌ Validation failed
```

---

## Common Workflows

### Starting a New Project

```bash
# 1. Navigate to project root
cd my-new-project

# 2. Initialize copilot instructions
copilot-instructions-templates init

# 3. Select templates interactively
#    Example: TypeScript + Next.js + Security Expert

# 4. Review generated file
cat .github/copilot-instructions.md

# 5. Customize as needed
code .github/copilot-instructions.md

# 6. Commit to repository
git add .github/copilot-instructions.md
git commit -m "Add GitHub Copilot instructions"
```

### Updating Existing Instructions

```bash
# 1. List available templates to see what's new
copilot-instructions-templates list

# 2. Backup existing instructions
cp .github/copilot-instructions.md .github/copilot-instructions.md.backup

# 3. Re-run init to regenerate
copilot-instructions-templates init

# 4. Compare and merge changes
git diff .github/copilot-instructions.md

# 5. Commit updates
git add .github/copilot-instructions.md
git commit -m "Update Copilot instructions"
```

### Contributing New Templates

```bash
# 1. Validate your template before submitting
copilot-instructions-templates validate templates/new-template.md

# 2. Run strict validation
copilot-instructions-templates validate --strict templates/new-template.md

# 3. Ensure all templates pass validation
copilot-instructions-templates validate

# 4. Submit pull request if all checks pass
```

---

## Configuration

### Environment Variables

Currently, no environment variables are required. Future versions may support:

- `COPILOT_TEMPLATES_PATH`: Custom template directory
- `COPILOT_INSTRUCTIONS_OUTPUT`: Default output path

### Package.json Scripts

Add these scripts to your `package.json` for convenience:

```json
{
  "scripts": {
    "copilot:init": "copilot-instructions-templates init",
    "copilot:list": "copilot-instructions-templates list",
    "copilot:validate": "copilot-instructions-templates validate"
  }
}
```

Then use:

```bash
npm run copilot:init
npm run copilot:list
npm run copilot:validate
```

---

## Troubleshooting

### "No templates found"

**Cause**: CLI cannot locate template files.

**Solution**: Ensure you're running from the root of the `copilot-instructions-templates` repository, or templates are installed correctly.

### "Module not found" errors

**Cause**: Dependencies not installed or TypeScript not compiled.

**Solution**:
```bash
npm install
npm run build
```

### "Permission denied" on init

**Cause**: No write permission for output directory.

**Solution**:
```bash
# Check directory permissions
ls -la .github/

# Create directory if needed
mkdir -p .github

# Try again
copilot-instructions-templates init
```

### Validation fails with YAML errors

**Cause**: Malformed YAML frontmatter.

**Solution**:
```bash
# Check YAML syntax
cat templates/your-template.md | head -n 20

# Ensure frontmatter uses proper YAML format:
---
title: "Template Name"
category: "language"
tags: ["tag1", "tag2"]
difficulty: "intermediate"
---
```

---

## Advanced Usage

### Combining Specific Templates Programmatically

While the CLI supports interactive selection, you can also create scripts:

```javascript
// combine-templates.js
import { loadTemplate } from '@github-copilot/instruction-templates';

const templates = [
  'templates/languages/typescript.md',
  'templates/frameworks/nextjs.md',
  'templates/roles/security-expert.md'
];

// Load and combine...
```

### Custom Template Directories

```bash
# Validate templates in custom directory (future feature)
copilot-instructions-templates validate custom-templates/**/*.md
```

---

## CI/CD Integration

### GitHub Actions

```yaml
name: Validate Copilot Instructions

on:
  pull_request:
    paths:
      - '.github/copilot-instructions.md'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install -g @github-copilot/instruction-templates
      - run: copilot-instructions-templates validate .github/copilot-instructions.md
```

---

## Getting Help

### Command Help

```bash
# General help
copilot-instructions-templates --help

# Command-specific help
copilot-instructions-templates list --help
copilot-instructions-templates init --help
copilot-instructions-templates validate --help
```

### Version Information

```bash
copilot-instructions-templates --version
```

### Report Issues

For bugs or feature requests, please open an issue:
https://github.com/shira022/copilot-instructions-templates/issues

---

**Last Updated**: 2026-01-28  
**CLI Version**: 1.0.0
