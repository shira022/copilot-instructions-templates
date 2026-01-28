# Best Practices for GitHub Copilot Instructions

This guide provides practical advice for writing effective GitHub Copilot instructions and getting the most value from this template repository.

## 📋 Table of Contents

- [Writing Effective Instructions](#writing-effective-instructions)
- [Customizing Templates](#customizing-templates)
- [Combining Multiple Templates](#combining-multiple-templates)
- [Common Mistakes and Fixes](#common-mistakes-and-fixes)
- [Testing Your Instructions](#testing-your-instructions)
- [Maintenance and Updates](#maintenance-and-updates)

---

## Writing Effective Instructions

### Be Specific, Not Generic

❌ **Bad**: "Write good code"
✅ **Good**: "Use snake_case for function names, limit functions to 50 lines, and include type hints for all parameters"

❌ **Bad**: "Follow best practices"
✅ **Good**: "Follow PEP 8 strictly, format with black (88 character line length), and enforce type checking with mypy in strict mode"

### Use Prescriptive Language

Use "always", "never", "must", "should" to set clear expectations:

- ✅ "Always use async/await for I/O operations"
- ✅ "Never expose database models directly in API responses"
- ✅ "Must include docstrings for all public functions"
- ✅ "Should prefer composition over inheritance"

### Include Version Numbers

Specify exact versions for major dependencies to avoid ambiguity:

- ✅ "Python 3.12+"
- ✅ "FastAPI 0.109+"
- ✅ "Next.js 14 with App Router"
- ❌ "Latest Python" (too vague)

### Provide Examples

Include code examples that demonstrate your standards:

```markdown
### Error Handling

Always use HTTPException for client errors:

\`\`\`python
from fastapi import HTTPException, status

if not user:
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found"
    )
\`\`\`
```

---

## Customizing Templates

### Start with a Base Template

1. **Copy** the relevant template from this repository
2. **Read** through all sections carefully
3. **Customize** to match your project's specific needs
4. **Remove** any sections that don't apply
5. **Add** project-specific guidelines

### Project-Specific Customizations

#### Adjust Tech Stack Versions

Update versions to match your project:

```markdown
- **Framework**: Next.js 13.5 (Pages Router)  <!-- Adjust if using older version -->
- **Database**: PostgreSQL 15 with Prisma 5.0  <!-- Add your DB if not listed -->
```

#### Customize Project Layout

Modify the directory structure to reflect your actual project:

```markdown
\`\`\`
your-project/
├── src/
│   ├── app/              # Your actual directory name
│   ├── components/       # Keep if you have this
│   └── custom-folder/    # Add your custom directories
\`\`\`
```

#### Add Company/Team Standards

Include your organization's specific requirements:

```markdown
### Company-Specific Standards

- **Code Review**: All code must be reviewed by at least 2 team members
- **Documentation**: Use our internal wiki format (link to wiki)
- **Deployment**: Follow our GitOps workflow (link to docs)
- **Monitoring**: Add DataDog instrumentation to all services
```

### When to Create a Custom Template

Consider creating a fully custom template when:

- Your tech stack isn't covered by existing templates
- You have highly specific domain requirements (e.g., medical, finance)
- Your team has established conventions that differ significantly
- You're working with proprietary frameworks or tools

Use [templates/_base-template.md](../templates/_base-template.md) as a starting point.

---

## Combining Multiple Templates

Many projects benefit from combining multiple templates. Here's how to do it effectively:

### Layering Strategy

Use this hierarchy:
1. **Base Layer**: Language template (TypeScript, Python, Go, Rust)
2. **Framework Layer**: Framework template (Next.js, FastAPI, NestJS)
3. **Role Layer**: Role template (Security Expert, Test Engineer)

### Example: Full-Stack Web Application

Combine Next.js + TypeScript + Security Expert:

```markdown
# Your Project - GitHub Copilot Instructions

## Role / Identity

You are a senior full-stack developer specializing in Next.js applications.
<!-- Combine role definitions from Next.js and TypeScript templates -->

<!-- Include Security Expert mindset -->
You prioritize security at every layer and follow OWASP best practices.

## Context & Tech Stack

<!-- Merge tech stacks -->
- **Language**: TypeScript 5.3 (strict mode)
- **Framework**: Next.js 14 (App Router)
- **Frontend**: React 18, Tailwind CSS 3.4
<!-- Add security tools from Security Expert template -->
- **Security**: ESLint security plugins, OWASP ZAP for scanning
```

See [examples/full-stack-web.md](../examples/full-stack-web.md) for a complete example.

### Example: API Backend

Combine FastAPI + Python + Test Engineer:

```markdown
# API Backend - GitHub Copilot Instructions

## Role / Identity

You are a senior backend engineer specializing in Python APIs with a strong focus on testing.
<!-- Combine FastAPI + Python + Test Engineer roles -->

## Context & Tech Stack

- **Language**: Python 3.12+
- **Framework**: FastAPI 0.109+
- **Testing**: pytest with 95%+ coverage requirement
<!-- Include Test Engineer's testing frameworks -->
- **Test Tools**: pytest, httpx, pytest-cov, pytest-mock
```

See [examples/api-backend.md](../examples/api-backend.md) for a complete example.

### Resolving Conflicts

When combining templates, you may encounter conflicting advice:

#### Conflict: Naming Conventions

**TypeScript template**: "Use camelCase for variables"
**Your API**: "Use snake_case to match backend responses"

**Resolution**: Be explicit about when each applies:

```markdown
- **Frontend**: Use camelCase for TypeScript variables
- **API Responses**: Use snake_case (matches backend)
- **Conversion**: Transform case at API boundary using helper functions
```

#### Conflict: File Organization

**Next.js template**: "Put components in src/components"
**Your project**: "Use feature-based organization"

**Resolution**: Override with your structure:

```markdown
## Project Layout

We use feature-based organization:

\`\`\`
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── api/
│   └── dashboard/
\`\`\`
```

---

## Common Mistakes and Fixes

### Mistake #1: Too Generic

❌ **Problem**: Instructions are too vague to be actionable

```markdown
Write clean, maintainable code following best practices.
```

✅ **Fix**: Be specific and prescriptive

```markdown
- Keep functions under 50 lines
- Use descriptive variable names (no single letters except loop counters)
- Extract magic numbers to named constants
- Add JSDoc comments to all exported functions
```

### Mistake #2: Inconsistent with Codebase

❌ **Problem**: Instructions don't match actual project structure

**Instructions say**: "Put tests in `__tests__/` directories"
**Reality**: Tests are in `src/**/*.test.ts` files

✅ **Fix**: Update instructions to match reality or refactor code

```markdown
- **Test Location**: Tests live alongside source files as `*.test.ts`
- **Pattern**: `src/components/Button.tsx` → `src/components/Button.test.tsx`
```

### Mistake #3: Leaving Template Comments

❌ **Problem**: Not removing instructional comments from base template

```markdown
## Coding Standards

<!-- Define specific rules, patterns, and conventions -->
- Use TypeScript strict mode
```

✅ **Fix**: Remove all HTML comments before committing

```markdown
## Coding Standards

- Use TypeScript strict mode
- Enable all strict flags in tsconfig.json
```

### Mistake #4: Missing Critical Project Context

❌ **Problem**: Forgetting to include important project constraints

**Missing**: "This is a monorepo using Turborepo"

This leads to Copilot suggesting incorrect import paths or build commands.

✅ **Fix**: Add project-specific context

```markdown
## Context & Tech Stack

- **Repository**: Monorepo using Turborepo
- **Packages**: `apps/web`, `apps/api`, `packages/ui`
- **Imports**: Use `@repo/ui` for shared components
```

### Mistake #5: No Examples

❌ **Problem**: Rules without examples are hard to follow

```markdown
Use proper error handling
```

✅ **Fix**: Include code examples

```markdown
### Error Handling

Always wrap async operations in try-catch:

\`\`\`typescript
try {
  const data = await fetchUser(id);
  return data;
} catch (error) {
  logger.error('Failed to fetch user', { userId: id, error });
  throw new UserNotFoundError(id);
}
\`\`\`
```

### Mistake #6: Outdated Instructions

❌ **Problem**: Instructions reference old dependencies or patterns

**Instructions**: "Use Pages Router in Next.js"
**Project**: Recently migrated to App Router

✅ **Fix**: Update instructions after major changes

```markdown
## Context & Tech Stack

- **Framework**: Next.js 14 with App Router (migrated from Pages Router on 2024-12-15)
- **Routing**: Use `app/` directory, not `pages/`
- **Data Fetching**: Use Server Components and `fetch()`, not `getServerSideProps`
```

---

## Testing Your Instructions

### Manual Testing Process

1. **Copy** your instructions to `.github/copilot-instructions.md`
2. **Open** your project in VS Code with GitHub Copilot enabled
3. **Test** with representative prompts:

#### For Language Templates

- "Create a new utility function for date formatting"
- "Add error handling to this function"
- "Write a function to validate email addresses"

**Verify**: Copilot uses correct naming conventions, includes type hints, follows your patterns

#### For Framework Templates

- "Create a new API endpoint for user registration"
- "Add a new page component for the dashboard"
- "Implement authentication middleware"

**Verify**: Copilot places files in correct locations, uses framework-specific patterns, includes proper imports

#### For Role Templates

- "Review this code for security vulnerabilities"
- "Add comprehensive tests for this component"
- "Refactor this function to improve maintainability"

**Verify**: Copilot provides suggestions aligned with the role's expertise

### Automated Validation

Create a checklist of requirements:

```markdown
## Validation Checklist

- [ ] Copilot uses snake_case for function names
- [ ] Copilot includes type hints in function signatures
- [ ] Copilot places new files in correct directories
- [ ] Copilot imports from specified libraries
- [ ] Copilot suggests appropriate test frameworks
- [ ] Copilot follows error handling patterns
```

### Common Issues and Debugging

**Issue**: Copilot ignores your naming conventions

**Debug**:
- Check if naming section is clear and prescriptive
- Add examples showing correct naming
- Verify instructions are actually loaded (check .github/copilot-instructions.md)

**Issue**: Copilot suggests wrong file locations

**Debug**:
- Review Project Layout section for clarity
- Add comments explaining directory purposes
- Include examples of file paths

**Issue**: Copilot uses wrong libraries

**Debug**:
- Verify library versions are specified in Context & Tech Stack
- Add "Never use X, always use Y instead" statements
- Include import examples in Coding Standards

---

## Maintenance and Updates

### When to Update Instructions

Update your instructions when:

- **Major dependency upgrades**: Framework or language version changes
- **New team conventions**: Adopted new coding standards or tools
- **Project evolution**: Structure or architecture changes
- **Common mistakes**: Pattern of incorrect Copilot suggestions
- **Feedback from team**: Developers report unclear or missing guidance

### Version Control

Treat instructions like code:

```bash
# Create a branch for instruction updates
git checkout -b update-copilot-instructions

# Make changes to .github/copilot-instructions.md
# ...

# Commit with clear message
git commit -m "Update Copilot instructions: add Next.js 14 App Router patterns"

# Create PR for team review
git push origin update-copilot-instructions
```

### Changelog

Keep a log of significant changes:

```markdown
## Instruction Changelog

### 2024-12-15
- Migrated from Pages Router to App Router patterns
- Added Server Component guidelines
- Updated data fetching patterns

### 2024-11-01
- Added Tailwind CSS conventions
- Specified React 18 best practices
- Removed deprecated patterns
```

### Team Collaboration

For team projects:

1. **Review together**: Discuss instructions in team meetings
2. **Gather feedback**: Ask developers what Copilot gets wrong
3. **Iterate**: Continuously improve based on real usage
4. **Document decisions**: Explain why certain standards exist
5. **Share examples**: Collect good Copilot suggestions as validation

### Measuring Effectiveness

Track improvements:

- **Before**: How often do developers fix Copilot suggestions?
- **After**: Are suggestions more accurate after instruction updates?
- **Metrics**: Code review comments about standards violations
- **Feedback**: Developer satisfaction with Copilot suggestions

---

## Additional Resources

- [Template Structure Guide](template-structure.md) - Detailed breakdown of the 5-section format
- [Contributing Guidelines](../CONTRIBUTING.md) - How to contribute templates back to this repository
- [Example Templates](../examples/) - Real-world examples combining multiple templates
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot) - Official Copilot documentation

---

## Questions or Feedback?

If you have questions about best practices or want to share your experiences:

- Open an issue in this repository
- Share your custom templates with the community
- Contribute improvements to this guide

Remember: Effective instructions are **specific**, **prescriptive**, **tested**, and **maintained**. Start simple, iterate based on real usage, and continuously improve!
