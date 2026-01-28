# [Template Name] - GitHub Copilot Instructions

<!--
INSTRUCTIONS FOR USING THIS TEMPLATE:

1. Copy this file to the appropriate directory:
   - languages/ for language-specific templates (e.g., typescript.md, python.md)
   - frameworks/ for framework templates (e.g., nextjs.md, fastapi.md)
   - roles/ for role-based templates (e.g., security-expert.md)

2. Replace [placeholders] with actual content

3. Fill in ALL 5 required sections below

4. Remove these instruction comments before committing

5. Test the template in a real project before submitting

6. See docs/template-structure.md for detailed guidance on each section
-->

## Role / Identity

<!--
Define the AI agent's expertise, perspective, and professional identity.
Be specific about the role, areas of expertise, and development philosophy.

Example:
"You are a senior TypeScript developer specializing in type-safe React applications..."
-->

You are a [role/title] with expertise in [key areas]. Your focus is on [primary objectives/philosophy].

## Context & Tech Stack

<!--
List the complete technical context:
- Primary language with version
- Runtime/environment
- Major frameworks and versions
- Key libraries that affect code patterns
- Build tools
- Testing frameworks

Example:
- **Language**: TypeScript 5.3 (strict mode enabled)
- **Runtime**: Node.js 20 LTS
- **Framework**: Next.js 14 with App Router
-->

- **Language**: [Language] [version]
- **Runtime**: [Runtime/environment with version]
- **Framework**: [Framework with version]
- **Key Libraries**:
  - [Library 1]: [Purpose]
  - [Library 2]: [Purpose]
  - [Library 3]: [Purpose]
- **Build Tool**: [Build tool name]
- **Testing**: [Test framework(s)]
- **Other**: [Additional context like deployment platform, database, etc.]

## Project Layout

<!--
Explain the directory structure and where different types of code live.
Help Copilot navigate without excessive file exploration.

Use a tree structure with comments explaining purposes:
```
src/
├── components/    # Reusable UI components
├── lib/           # Business logic and utilities
└── types/         # TypeScript type definitions
```
-->

```
[root]/
├── [dir1]/                # [Purpose of directory 1]
│   ├── [subdir]/         # [Purpose of subdirectory]
│   └── [file-pattern]    # [Type of files here]
├── [dir2]/                # [Purpose of directory 2]
├── [dir3]/                # [Purpose of directory 3]
└── [entry-point]         # [Main entry point or config]
```

**Key patterns**:
- [Pattern 1]: [Explanation]
- [Pattern 2]: [Explanation]
- [Pattern 3]: [Explanation]

**Important notes**:
- [Note 1]: [Context or constraint]
- [Note 2]: [Context or constraint]

## Coding Standards

<!--
Define specific rules, patterns, and conventions.
Be prescriptive - use "always" or "never" when appropriate.

Include:
- Naming conventions
- File naming patterns
- Design patterns to use/avoid
- Library-specific guidelines
- Error handling approaches
- Testing requirements
-->

### [Language/Framework] Conventions

- **Naming**:
  - [Convention 1]: [Examples]
  - [Convention 2]: [Examples]
  - [Convention 3]: [Examples]

- **File Naming**: [Pattern - e.g., "PascalCase for components", "kebab-case for utilities"]

- **Exports**: [Guideline - e.g., "Prefer named exports", "Default exports for pages only"]

### Code Organization

- **Imports**: [How to organize - e.g., "Group by: React, third-party, local"]
- **Functions**: [Guidelines - e.g., "Define before use", "Max 50 lines"]
- **Comments**: [When/how to comment]

### [Framework/Library] Specific

- **[Feature 1]**: [How to use it - e.g., "Use hooks for state management"]
- **[Feature 2]**: [Pattern to follow]
- **[Feature 3]**: [Anti-patterns to avoid]

### Testing

- **Coverage**: [Requirements - e.g., "Minimum 80% for business logic"]
- **File Naming**: [Pattern - e.g., "*.test.ts", "*_test.py"]
- **Test Structure**: [Guidelines - e.g., "Arrange-Act-Assert pattern"]
- **Mocking**: [Approach - e.g., "Use Vitest mocks for external dependencies"]

### Error Handling

- **Exceptions**: [How to handle - e.g., "Use custom error classes", "Raise HTTPException"]
- **Validation**: [Approach - e.g., "Validate all inputs with Zod"]
- **Logging**: [What/how to log]

## Workflow & Commands

<!--
Provide exact commands for common development tasks.
These should be copy-paste ready and tested.
-->

### Initial Setup

```bash
# [Step 1 description]
[command 1]

# [Step 2 description]
[command 2]

# [Step 3 description - e.g., "Copy environment variables"]
[command 3]
```

### Development

```bash
# Start development server
[dev command]

# [Other dev command - e.g., "Watch mode for tests"]
[command]
```

### Quality Checks

```bash
# Run linter
[lint command]

# Auto-fix lint issues
[lint fix command]

# Format code
[format command]

# Type checking (if applicable)
[type check command]

# Run tests
[test command]

# Test coverage
[coverage command]
```

### Building

```bash
# Production build
[build command]

# [Other build command - e.g., "Preview production build"]
[command]
```

### [Additional Section - e.g., Database, Deployment]

```bash
# [Command description]
[command]

# [Command description]
[command]
```

### Troubleshooting

```bash
# [Common fix 1 - e.g., "Clear cache"]
[command]

# [Common fix 2 - e.g., "Reinstall dependencies"]
[command]
```

---

## Testing This Template

Before using or submitting this template:

1. **Copy** it to `.github/copilot-instructions.md` in a project matching this tech stack
2. **Test** by asking Copilot to perform typical tasks
3. **Verify** that Copilot follows the naming conventions, file locations, and patterns
4. **Iterate** and adjust if needed

## Contributing

Found an issue or want to improve this template? See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines on submitting changes.

---

**Template Version**: 1.0  
**Last Updated**: [Date]  
**Maintainer**: [GitHub username or "Community"]
