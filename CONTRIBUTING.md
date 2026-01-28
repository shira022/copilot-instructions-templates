# Contributing to Copilot Instructions Templates

Thank you for your interest in contributing to this project! This repository aims to provide high-quality, well-structured GitHub Copilot instruction templates for various languages, frameworks, and development roles.

## Table of Contents

- [Before You Start](#before-you-start)
- [How to Contribute](#how-to-contribute)
- [Template Requirements](#template-requirements)
- [Step-by-Step Guide](#step-by-step-guide)
- [Quality Standards](#quality-standards)
- [Submission Process](#submission-process)
- [Review Process](#review-process)
- [Code of Conduct](#code-of-conduct)

## Before You Start

### Understanding the Project

This repository organizes GitHub Copilot instruction templates into three categories:

- **languages/**: Language-specific templates (TypeScript, Python, Go, etc.)
- **frameworks/**: Framework-specific templates (Next.js, FastAPI, React+Tailwind, etc.)
- **roles/**: Role-based templates (Security Expert, Refactoring Specialist, etc.)

### Prerequisites

Before contributing a template:

1. ✅ **Read** [docs/template-structure.md](docs/template-structure.md) - understand the 5 required sections
2. ✅ **Check existing templates** - ensure your template doesn't duplicate existing work
3. ✅ **Use the base template** - start from [templates/_base-template.md](templates/_base-template.md)
4. ✅ **Test in a real project** - templates must be validated before submission

## How to Contribute

We welcome contributions in several forms:

### 1. Adding a New Template 📝

The most common contribution. See [Step-by-Step Guide](#step-by-step-guide) below.

### 2. Improving Existing Templates 🔧

Found an issue or have a better approach? Submit improvements to existing templates.

### 3. Documentation 📚

Help improve guides, examples, or contribution documentation.

### 4. Bug Reports 🐛

Report issues with existing templates or documentation.

### 5. Feature Requests 💡

Suggest new template categories or structural improvements.

## Template Requirements

Every template **MUST** include:

### ✅ The 5 Required Sections

1. **Role / Identity** - AI agent's expertise and perspective
2. **Context & Tech Stack** - Complete technical environment
3. **Project Layout** - Directory structure and purposes
4. **Coding Standards** - Specific rules and conventions
5. **Workflow & Commands** - Exact, tested commands

See [docs/template-structure.md](docs/template-structure.md) for detailed guidance on each section.

### ✅ Quality Criteria

- **Specific, not generic**: "Use `zod` for validation" not "validate inputs"
- **Tested and accurate**: All commands must work as documented
- **Well-structured**: Proper Markdown formatting, clear sections
- **Complete**: No placeholder content like "[TODO]" or "[Fill this in]"
- **Useful**: Solves a real need for developers

### ❌ What Not to Include

- ❌ Templates for deprecated technologies
- ❌ Overly broad templates ("Full Stack Developer" without specific tech)
- ❌ Untested commands or patterns
- ❌ Copy-pasted content without proper attribution
- ❌ Promotional content or external links to products/services

## Step-by-Step Guide

### Step 1: Check for Existing Work

```bash
# Search for similar templates
cd templates
find . -name "*[your-technology]*"
```

Open an issue using the [new-template issue template](.github/ISSUE_TEMPLATE/new-template.md) to announce your intent and avoid duplicate work.

### Step 2: Set Up Your Development Environment

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR-USERNAME/copilot-instructions-templates.git
cd copilot-instructions-templates

# Create a feature branch
git checkout -b feature/add-[template-name]

# Example:
git checkout -b feature/add-fastapi-template
```

### Step 3: Create Your Template

```bash
# Copy the base template to the appropriate directory
cp templates/_base-template.md templates/frameworks/fastapi.md

# Edit the template
code templates/frameworks/fastapi.md
```

**Naming conventions**:
- Use lowercase, hyphen-separated names: `fastapi.md`, `react-tailwind.md`
- Be specific: `nextjs-app-router.md` not `nextjs.md` if there are multiple variants
- Keep it concise: `typescript.md` not `typescript-language-template.md`

### Step 4: Fill in All Sections

Follow the structure in [docs/template-structure.md](docs/template-structure.md):

1. **Role / Identity**: Define the AI's expertise
   - ✅ "You are a senior FastAPI developer..."
   - ❌ "You know Python"

2. **Context & Tech Stack**: List versions and key libraries
   - ✅ "Python 3.12, FastAPI 0.109, SQLAlchemy 2.0"
   - ❌ "Python, FastAPI"

3. **Project Layout**: Show directory structure with explanations
   - ✅ Include tree structure with comments
   - ❌ Just list directory names

4. **Coding Standards**: Provide specific, actionable rules
   - ✅ "Use snake_case for function names"
   - ❌ "Follow best practices"

5. **Workflow & Commands**: Include tested, working commands
   - ✅ `uvicorn app.main:app --reload`
   - ❌ "Start the server"

### Step 5: Test Your Template

**Critical step** - don't skip this!

1. Create a sample project matching your tech stack
2. Copy your template to `.github/copilot-instructions.md` in that project
3. Open the project in VS Code with GitHub Copilot enabled
4. Test typical tasks:
   ```
   - "Create a new API endpoint for user registration"
   - "Add validation to this function"
   - "Write tests for this component"
   - "Refactor this code following our standards"
   ```
5. Verify Copilot:
   - Follows naming conventions
   - Places files in correct directories
   - Uses the specified libraries and patterns
   - Suggests appropriate commands
6. Iterate on the template if behavior doesn't match expectations

### Step 6: Commit Your Changes

```bash
# Stage your new template
git add templates/frameworks/fastapi.md

# Commit with a clear message
git commit -m "Add FastAPI template with SQLAlchemy 2.0 patterns"

# Push to your fork
git push origin feature/add-fastapi-template
```

**Commit message format**:
- ✅ "Add [Technology] template for [use case]"
- ✅ "Update TypeScript template with stricter type rules"
- ❌ "New template"
- ❌ "WIP"

### Step 7: Submit a Pull Request

1. Go to the original repository on GitHub
2. Click "New Pull Request"
3. Select your fork and branch
4. Fill in the PR template:
   - **Title**: Clear, descriptive (e.g., "Add FastAPI template with async SQLAlchemy patterns")
   - **Description**: 
     - What template you're adding
     - Key features/patterns covered
     - Test results (what you tested and verified)
     - Any questions or areas needing review
5. Link to the related issue (if applicable): "Closes #X" or "Relates to #Y"

## Quality Standards

### Template Content

- **Completeness**: All 5 sections filled with substantial content
- **Accuracy**: Commands tested and working as documented
- **Clarity**: Clear explanations, no jargon without context
- **Specificity**: Concrete rules, not vague suggestions
- **Usefulness**: Solves real problems developers face

### Markdown Formatting

- Use `##` for main sections (not `#`)
- Use code fences with language tags: ```typescript, ```bash
- Use relative links: `[link](../docs/template-structure.md)`
- Keep lines under 100 characters when possible
- Use task lists for actionable items: `- [ ]`
- Include blank lines between sections for readability

### File Naming

- **Templates**: lowercase, hyphen-separated
  - ✅ `typescript.md`, `react-tailwind.md`, `security-expert.md`
  - ❌ `TypeScript.md`, `react_tailwind.md`, `SecurityExpert.md`

- **Directories**: lowercase, plural
  - ✅ `languages/`, `frameworks/`, `roles/`
  - ❌ `Languages/`, `framework/`

## Submission Process

### What Happens After You Submit?

1. **Automated checks** (once Phase 4 is complete):
   - Markdown linting
   - Link validation
   - Section completeness check

2. **Manual review** by maintainers:
   - Content quality
   - Accuracy of technical details
   - Compliance with standards
   - Usefulness to community

3. **Feedback and iteration**:
   - Maintainers may request changes
   - Address feedback promptly
   - Update your PR branch

4. **Approval and merge**:
   - Once approved, your PR will be merged
   - Your template becomes part of the repository!

### Response Times

- **Initial review**: Within 3-5 business days
- **Follow-up reviews**: Within 2-3 business days
- **Urgent fixes**: Within 1 business day

## Review Process

### What Reviewers Look For

✅ **Must Have**:
- All 5 sections complete
- Template tested in real project
- Commands verified and working
- Follows naming conventions
- Proper Markdown formatting
- No placeholders or TODOs

⚠️ **Nice to Have**:
- Examples showing before/after
- Common pitfalls section
- Links to official documentation
- Version compatibility notes

### Common Review Feedback

1. **"Commands need testing"**
   - Action: Test all commands in a fresh environment
   - Verify versions match your documentation

2. **"Too generic/vague"**
   - Action: Add specific library names, patterns, examples
   - Replace "validate inputs" with "use Zod for validation"

3. **"Missing directory structure"**
   - Action: Add tree structure in Project Layout section
   - Explain what each directory contains

4. **"Coding standards too loose"**
   - Action: Be more prescriptive
   - Use "always" / "never" when appropriate
   - Add enforcement methods (linter rules, etc.)

## Tips for First-Time Contributors

### Start Small

Consider starting with:
- Improving documentation
- Fixing typos in existing templates
- Adding examples to [docs/template-structure.md](docs/template-structure.md)

### Ask Questions

- Not sure if your template fits? Open an issue first
- Uncertain about a section? Check [docs/template-structure.md](docs/template-structure.md)
- Need clarification? Comment on your PR or open a discussion

### Learn from Examples

Once Phase 2 templates are complete, review existing templates in:
- `templates/languages/` - for language-specific patterns
- `templates/frameworks/` - for framework patterns
- `templates/roles/` - for role-based patterns

## Code of Conduct

### Our Standards

- **Be respectful**: Treat all contributors with respect
- **Be constructive**: Provide helpful, actionable feedback
- **Be patient**: Remember that everyone is learning
- **Be collaborative**: Work together to improve templates
- **Be inclusive**: Welcome contributors of all backgrounds and skill levels

### Unacceptable Behavior

- Harassment or discriminatory language
- Personal attacks or insults
- Spam or promotional content
- Sharing private information without permission
- Any conduct that creates an unwelcoming environment

### Reporting

If you experience or witness unacceptable behavior, please report it by:
- Opening a private issue
- Contacting the repository maintainers directly

## Questions?

- **Template structure questions**: See [docs/template-structure.md](docs/template-structure.md)
- **General questions**: Open a [GitHub Discussion](../../discussions)
- **Template proposals**: Use the [new-template issue template](.github/ISSUE_TEMPLATE/new-template.md)
- **Bug reports**: Open a standard issue

## Recognition

Contributors who submit accepted templates will be:
- Listed in the README (once catalog is complete)
- Credited in the template metadata
- Recognized in release notes

Thank you for helping make GitHub Copilot more effective for developers! 🚀

---

**Last Updated**: 2026-01-28  
**Version**: 1.0
