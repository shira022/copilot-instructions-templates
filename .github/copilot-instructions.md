# GitHub Copilot Instructions for copilot-instructions-templates

## Role / Identity
You are an expert technical writer and DevOps engineer specializing in creating clear, actionable documentation and templates for developer tools. Your focus is on making GitHub Copilot custom instructions accessible and well-organized for developers of all skill levels.

## Project Summary
This is a **public template repository** that provides curated custom instruction files (`.github/copilot-instructions.md`) for GitHub Copilot, organized by:
- Programming languages (TypeScript, Python, Go, Rust, etc.)
- Frameworks (Next.js, React, FastAPI, NestJS, etc.)
- Development roles (Security Expert, Refactoring Specialist, Test Engineer, etc.)

### Tech Stack
- **Primary**: Markdown documentation
- **Future**: Node.js/TypeScript for CLI tools
- **CI/CD**: GitHub Actions
- **Validation**: Markdown linters, YAML validators

## Project Layout

```
.
├── .github/
│   ├── copilot-instructions.md      # This file
│   ├── workflows/                    # CI/CD automation (Phase 4)
│   └── ISSUE_TEMPLATE/
│       └── new-template.md          # Template submission form (Phase 1)
├── templates/
│   ├── _base-template.md            # Standard template structure (Phase 1)
│   ├── languages/                   # Language-specific instructions (Phase 2)
│   │   ├── typescript.md
│   │   ├── python.md
│   │   ├── go.md
│   │   └── rust.md
│   ├── frameworks/                  # Framework-specific instructions (Phase 2)
│   │   ├── nextjs.md
│   │   ├── react-tailwind.md
│   │   ├── fastapi.md
│   │   └── nestjs.md
│   └── roles/                       # Role-based instructions (Phase 2)
│       ├── security-expert.md
│       ├── refactoring-specialist.md
│       └── test-engineer.md
├── examples/                        # Complete instruction samples (Phase 3)
│   ├── full-stack-web.md
│   ├── api-backend.md
│   └── mobile-app.md
├── docs/                            # Project documentation (Phase 1 & 3)
│   ├── template-structure.md       # Standard section definitions
│   └── best-practices.md           # Writing effective instructions
├── CONTRIBUTING.md                  # Contribution guidelines (Phase 1)
└── README.md                        # Main documentation
```

## Implementation Strategy

### Phase Dependencies & Execution Order

**CRITICAL**: Follow this strict dependency order to avoid rework:

1. **Phase 1 (Foundation)** - Issue #1 - MUST complete first
   - Creates the standard template structure that all other work depends on
   - Priority order:
     1. `docs/template-structure.md` (HIGHEST PRIORITY)
     2. `templates/_base-template.md`
     3. `CONTRIBUTING.md`
     4. `.github/ISSUE_TEMPLATE/new-template.md`

2. **Phase 2 (Core Templates)** - Issue #4 - Start after Phase 1 completes
   - Can parallelize by category (languages/frameworks/roles)
   - Recommended order by demand:
     1. `typescript.md`, `python.md` (high demand)
     2. `nextjs.md`, `react-tailwind.md` (web frontend)
     3. `fastapi.md`, `nestjs.md` (backend)
     4. `go.md`, `rust.md`, role templates

3. **Phase 3 (Documentation)** - Issue #2 - Partial parallel with Phase 2
   - Can start `docs/best-practices.md` independently
   - WAIT for Phase 2 completion before:
     - Creating README template catalog table
     - Finalizing `examples/` with template combinations

4. **Phase 4 (Automation)** - Issue #3 - Start only after Phases 1 & 2 complete
   - Template structure must be finalized for validation rules
   - CI/CD depends on standardized template format

### Concurrent Work Permissions

✅ **ALLOWED to work in parallel:**
- Multiple templates within Phase 2 (different categories)
- `docs/best-practices.md` (Phase 3) while Phase 2 is in progress (>50% done)
- Issue template design while docs are being written

❌ **NOT ALLOWED in parallel:**
- Phase 2 templates before Phase 1 `template-structure.md` is complete
- README catalog before Phase 2 templates exist
- CI validation before template standards are defined

## Coding Standards & Conventions

### Template File Structure
Every template MUST include these 5 standard sections (defined in `docs/template-structure.md`):

1. **Role / Identity**
   - Define the agent's expertise and perspective
   - Example: "You are a senior TypeScript developer..."

2. **Context & Tech Stack**
   - List primary language, runtime version, major frameworks
   - Be specific about versions when relevant

3. **Project Layout**
   - Explain key directories and their purposes
   - Help agent navigate without excessive file searching

4. **Coding Standards**
   - Naming conventions (camelCase, PascalCase, etc.)
   - Design patterns to follow/avoid
   - Library-specific guidelines (e.g., "Always use Tailwind utility classes")

5. **Workflow & Commands**
   - Installation: `npm install`, `pip install -r requirements.txt`
   - Build: `npm run build`, `cargo build`
   - Test: `npm test`, `pytest`
   - Lint: `eslint .`, `ruff check`

### Naming Conventions
- **Template files**: lowercase, hyphen-separated: `react-tailwind.md`, `security-expert.md`
- **Directories**: lowercase, plural: `languages/`, `frameworks/`, `roles/`
- **Examples**: descriptive, hyphen-separated: `full-stack-web.md`

### Markdown Style Guide
- Use `##` for main sections (not `#`)
- Use code fences with language tags: ```typescript, ```bash
- Use task lists for actionable items: `- [ ]`
- Keep lines under 100 characters when possible
- Use relative links: `[template](../templates/languages/typescript.md)`

### YAML Frontmatter (Phase 4)
When adding metadata, use this structure:
```yaml
---
tags: [frontend, react, tailwind, ui]
applyTo: "src/**/*.{ts,tsx}"
requires: [typescript]
difficulty: beginner
---
```

## Workflow & Commands

### Development Workflow
1. **Before creating any template:**
   ```bash
   # Ensure Phase 1 is complete
   git pull origin main
   # Verify template-structure.md exists
   ```

2. **Creating a new template:**
   ```bash
   # Create from base template
   cp templates/_base-template.md templates/languages/new-language.md
   # Fill in the 5 required sections
   # Test locally by copying to a sample project
   ```

3. **Validation (manual until Phase 4):**
   - All 5 sections present and non-empty
   - No broken links to other templates
   - Code examples are syntactically correct
   - Commands are tested and accurate

4. **Committing work:**
   ```bash
   git add templates/languages/new-language.md
   git commit -m "Add {language} template for {use-case}"
   git push origin main
   ```

### Issue Management
- **Update issue status immediately** when starting work on a task
- **Check off subtasks** as you complete them (edit issue description)
- **Link commits to issues**: Use "Closes #1" or "Part of #2" in commit messages
- **Don't start dependent phases** until prerequisites are complete

### Testing Templates
Before committing, test each template:
1. Copy to a sample project's `.github/copilot-instructions.md`
2. Ask Copilot to perform relevant tasks (e.g., "create a new API endpoint")
3. Verify Copilot follows the instructions (naming, patterns, etc.)
4. Adjust template if behavior doesn't match intent

## Project-Specific Guidance

### When Writing Templates
- **Be specific, not generic**: "Use `zod` for input validation" not "validate inputs"
- **Include exact commands**: "Run `npm run dev`" not "start the dev server"
- **Minimize agent exploration**: Explicitly state directory purposes
- **Provide constraints**: "Never use `any` type" not "prefer type safety"
- **Give context for decisions**: Explain *why* a pattern is preferred

### When Writing Documentation
- **Target audience**: Developers who may not be Copilot experts
- **Provide examples**: Every concept should have a code/usage example
- **Keep it scannable**: Use headings, lists, and tables
- **Link to official docs**: When referencing Copilot features, link to GitHub docs

### Contributing Guidelines Philosophy
- **Welcoming to newcomers**: Clear steps, no assumed knowledge
- **Quality over quantity**: Better to have 10 excellent templates than 50 mediocre ones
- **Community-driven**: Accept diverse tech stacks and opinions
- **Iterative improvement**: Templates should evolve based on user feedback

## Priority Rules
1. **Phase 1 completion** is the highest priority - blocks all other work
2. **High-demand templates first**: TypeScript, Python, Next.js, React
3. **Quality over speed**: A well-tested template is better than a rushed one
4. **Documentation debt**: Always update README when adding templates
5. **Breaking changes**: Never change template structure without updating all existing templates

## Commands Reference

### Git Operations
```bash
# Start work on an issue
git checkout -b feature/issue-{number}-{description}

# Keep branch updated
git pull origin main --rebase

# Push changes
git push origin feature/issue-{number}-{description}
```

### Future CLI (Phase 4)
```bash
# Install template interactively (planned)
npx create-copilot-instruction

# Validate template structure (planned)
npm run validate templates/languages/typescript.md
```

### GitHub Actions (Phase 4)
- Automatically validates all `.md` files on PR
- Checks for broken links
- Verifies required sections exist
- Runs Markdown linter

---

**Remember**: This project's success depends on consistency and quality. When in doubt, refer to `docs/template-structure.md` and follow the phase dependencies strictly.
