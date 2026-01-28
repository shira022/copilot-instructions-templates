# Template Structure - Standard Format Definition

## Overview

All templates in this repository must follow a standardized 5-section structure. This ensures consistency, completeness, and makes templates easier to understand and maintain.

## The 5 Required Sections

### 1. Role / Identity 🎭

**Purpose**: Define the AI agent's expertise, perspective, and professional identity.

**What to include**:
- Specific role or title (e.g., "senior TypeScript developer", "security auditor", "API architect")
- Areas of expertise relevant to the tech stack
- Development philosophy or mindset (e.g., "focus on developer experience", "prioritize security")
- Any constraints on the role (e.g., "avoid over-engineering", "prefer simplicity")

**Guidelines**:
- Be specific and concrete, not vague
- Use professional titles that developers recognize
- Set the tone for how Copilot should approach problems
- Consider what perspective would be most helpful for the target use case

**Good Examples**:
```markdown
## Role / Identity
You are a senior TypeScript developer specializing in type-safe React applications. You prioritize developer experience, maintainability, and compile-time correctness over runtime checks.
```

```markdown
## Role / Identity
You are a security-focused backend engineer with expertise in API security, authentication patterns, and OWASP best practices. You always consider attack vectors before suggesting implementations.
```

**Bad Examples**:
```markdown
## Role / Identity
You are a helpful developer.
```
❌ Too vague - doesn't provide specific expertise or perspective

```markdown
## Role / Identity
You know TypeScript, React, Node.js, Python, Go, and 20 other languages.
```
❌ Too broad - dilutes focus and effectiveness

---

### 2. Context & Tech Stack 🛠️

**Purpose**: Provide the complete technical context Copilot needs to generate appropriate code.

**What to include**:
- **Primary language** with version (e.g., "TypeScript 5.3", "Python 3.12")
- **Runtime/environment** (e.g., "Node.js 20 LTS", "Deno 1.40", "Browser ES2022")
- **Major frameworks** with versions when relevant (e.g., "Next.js 14 with App Router", "FastAPI 0.109")
- **Key libraries** that affect code style (e.g., "Tailwind CSS 3.x", "Zod for validation", "Prisma ORM")
- **Build tools** if they affect development (e.g., "Vite", "Webpack 5", "esbuild")
- **Testing frameworks** (e.g., "Vitest", "Jest", "pytest")

**Guidelines**:
- List dependencies in order of importance/impact
- Include version numbers when behavior differs between versions
- Don't list every dependency - focus on those that affect code patterns
- Mention platform constraints (e.g., "browser-only", "Node.js APIs available")

**Good Examples**:
```markdown
## Context & Tech Stack
- **Language**: TypeScript 5.3 (strict mode enabled)
- **Runtime**: Node.js 20 LTS
- **Framework**: Next.js 14 with App Router (React Server Components)
- **Styling**: Tailwind CSS 3.4
- **Data Fetching**: TanStack Query (React Query) v5
- **Validation**: Zod
- **Testing**: Vitest + React Testing Library
```

```markdown
## Context & Tech Stack
- **Language**: Python 3.12
- **Framework**: FastAPI 0.109
- **Database**: PostgreSQL 16 with SQLAlchemy 2.0
- **Validation**: Pydantic v2
- **Auth**: FastAPI-Users with JWT
- **Testing**: pytest + httpx
- **Deployment**: Docker + Uvicorn
```

**Bad Examples**:
```markdown
## Context & Tech Stack
- TypeScript
- React
- Node
```
❌ No versions, too minimal - doesn't specify important variants (e.g., Next.js vs CRA, React 18 features)

---

### 3. Project Layout 📁

**Purpose**: Help Copilot navigate your codebase without excessive file exploration.

**What to include**:
- Directory structure with clear purposes
- Where different types of code live (components, utilities, tests, etc.)
- Special directories or naming conventions
- Entry points and important files
- What to avoid touching (generated code, vendor files)

**Guidelines**:
- Focus on developer-maintained code, not node_modules or build artifacts
- Explain the "why" behind non-obvious structures
- Use tree notation or clear hierarchy
- Indicate which directories are most frequently modified
- Mention file naming patterns if they exist

**Good Examples**:
```markdown
## Project Layout

\```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth-protected routes group
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI primitives (buttons, inputs)
│   └── features/          # Feature-specific components
├── lib/
│   ├── db/                # Database client & queries
│   ├── auth/              # Auth utilities & middleware
│   └── utils/             # Generic helper functions
├── types/                 # Shared TypeScript types
└── hooks/                 # Custom React hooks
\```

**Key patterns**:
- Page components go in `app/` following Next.js conventions
- Reusable components are split: `ui/` for generic, `features/` for domain-specific
- All database logic stays in `lib/db/` - never in page components
```

```markdown
## Project Layout

\```
api/
├── routers/               # FastAPI route handlers (by domain)
│   ├── users.py
│   └── posts.py
├── models/                # SQLAlchemy ORM models
├── schemas/               # Pydantic request/response schemas
├── services/              # Business logic layer
├── dependencies.py        # FastAPI dependency injection
└── main.py               # Application entry point

tests/
├── unit/                  # Pure logic tests
└── integration/           # API endpoint tests
\```

**Architecture notes**:
- Router → Service → Model layering (no direct DB access in routers)
- Pydantic schemas for all API I/O (never expose ORM models directly)
- Tests mirror the `api/` structure
```

**Bad Examples**:
```markdown
## Project Layout
- src/ - contains source code
- tests/ - contains tests
```
❌ Too vague - doesn't help Copilot understand where to put new code

---

### 4. Coding Standards 📏

**Purpose**: Define specific rules, patterns, and conventions that Copilot should follow.

**What to include**:
- **Naming conventions** (camelCase, PascalCase, snake_case, kebab-case)
- **File naming patterns** (e.g., `UserProfile.tsx` vs `user-profile.tsx`)
- **Design patterns to use** (e.g., "hooks for state", "factory pattern for config")
- **Patterns to avoid** (e.g., "never use `any`", "no default exports")
- **Library-specific guidelines** (e.g., "always use Tailwind utilities, no custom CSS")
- **Code organization** (e.g., "group imports", "sort methods alphabetically")
- **Error handling** (e.g., "use Result type", "throw specific error classes")
- **Testing requirements** (e.g., "test coverage for all service functions")

**Guidelines**:
- Be prescriptive - say "always" or "never" when appropriate
- Provide rationale for non-obvious rules
- Include enforcement methods if they exist (e.g., "ESLint enforces this")
- Address common mistakes or anti-patterns in your stack

**Good Examples**:
```markdown
## Coding Standards

### TypeScript
- **Strict mode**: All files must be type-safe (no `any`, no `@ts-ignore` without explanation)
- **Naming**: PascalCase for types/components, camelCase for variables/functions
- **Exports**: Prefer named exports over default exports
- **Types**: Define types inline for simple cases, use `interface` for complex objects

### React
- **Components**: Function components with TypeScript (no React.FC)
- **Hooks**: Custom hooks must start with `use` and follow Rules of Hooks
- **State**: Prefer `useState` for local state, Zustand for global state
- **Props**: Always destructure props, use explicit typing

### Styling
- **Tailwind first**: Use utility classes for all styling
- **Custom CSS**: Only for animations or truly unique needs
- **Responsive**: Mobile-first approach (base = mobile, sm/md/lg for larger screens)

### Testing
- **Unit tests**: For all hooks and utility functions
- **Integration tests**: For API routes and data flows
- **File naming**: `*.test.ts` or `*.test.tsx`
- **Assertions**: Use `expect` assertions, not `assert`

### Code Organization
- **Imports**: Group and sort: (1) React, (2) third-party, (3) local
- **Functions**: Define before use, avoid hoisting
- **Comments**: Explain "why", not "what" (code should be self-documenting)
```

```markdown
## Coding Standards

### Python
- **Style**: Follow PEP 8, enforced by Ruff
- **Naming**: snake_case for functions/variables, PascalCase for classes
- **Type hints**: Required for all function signatures (enforced by mypy)
- **Docstrings**: Google-style for all public functions/classes

### FastAPI
- **Routers**: One router per domain entity (users, posts, etc.)
- **Dependencies**: Use Depends() for auth, DB sessions, configuration
- **Validation**: Pydantic models for all request/response bodies
- **Error handling**: Raise HTTPException with appropriate status codes

### Database
- **Migrations**: Alembic for all schema changes (never manual SQL)
- **Queries**: Use SQLAlchemy ORM, avoid raw SQL
- **Transactions**: Explicit session.commit() in services, not routers
- **Relationships**: Lazy loading by default, eager load with joinedload() when needed

### Testing
- **Fixtures**: Define in conftest.py for reusability
- **Test DB**: Use in-memory SQLite for fast tests
- **Async**: Use pytest-asyncio for async tests
- **Coverage**: Minimum 80% for service layer
```

**Bad Examples**:
```markdown
## Coding Standards
- Write clean code
- Follow best practices
- Use proper naming
```
❌ Too vague - doesn't give Copilot actionable rules

---

### 5. Workflow & Commands ⚙️

**Purpose**: Provide exact commands for common development tasks so Copilot can suggest or execute them.

**What to include**:
- **Installation**: How to set up the project
- **Development**: Start dev server, watch mode, hot reload
- **Building**: Production builds, optimization
- **Testing**: Run tests, watch mode, coverage reports
- **Linting/Formatting**: Check code quality, auto-fix
- **Database**: Migrations, seeding, reset
- **Deployment**: Build for production, deploy commands
- **Troubleshooting**: Common fixes (clear cache, reinstall deps)

**Guidelines**:
- Use exact commands that actually work in your project
- Include explanations for non-obvious commands
- Group related commands together
- Mention when commands should (or shouldn't) be run
- Include any required environment setup

**Good Examples**:
```markdown
## Workflow & Commands

### Initial Setup
\```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Run database migrations
npm run db:migrate

# Seed development data (optional)
npm run db:seed
\```

### Development
\```bash
# Start dev server (http://localhost:3000)
npm run dev

# Type checking (watch mode)
npm run type-check -- --watch

# Run tests in watch mode
npm run test:watch
\```

### Quality Checks
\```bash
# Run linter
npm run lint

# Auto-fix lint issues
npm run lint:fix

# Format code with Prettier
npm run format

# Type checking
npm run type-check

# Run all tests
npm test

# Test coverage report
npm run test:coverage
\```

### Database Operations
\```bash
# Create new migration
npm run db:migration:create -- --name=add-user-table

# Run migrations
npm run db:migrate

# Rollback last migration
npm run db:migrate:rollback

# Reset database (DESTRUCTIVE)
npm run db:reset
\```

### Building
\```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Analyze bundle size
npm run build:analyze
\```

### Troubleshooting
\```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies (if package-lock.json changed)
rm -rf node_modules package-lock.json && npm install

# Reset database to clean state
npm run db:reset && npm run db:seed
\```
```

**Bad Examples**:
```markdown
## Workflow & Commands
- Run the dev server
- Build for production
- Run tests
```
❌ No actual commands - Copilot can't suggest or execute these

---

## Validation Checklist

Before committing a template, verify:

- [ ] All 5 sections are present
- [ ] Each section has meaningful, non-placeholder content
- [ ] Role/Identity is specific and sets clear expectations
- [ ] Tech Stack includes versions for major dependencies
- [ ] Project Layout explains directory purposes clearly
- [ ] Coding Standards provide actionable, specific rules
- [ ] Workflow commands are tested and accurate
- [ ] No broken links to other templates or docs
- [ ] Markdown is properly formatted (use `##` for sections, code fences, etc.)
- [ ] Template tested in a real project with Copilot

---

## Template Testing Guide

### How to Test a Template

1. **Create a sample project** matching the tech stack
2. **Copy the template** to `.github/copilot-instructions.md` in that project
3. **Open VS Code** with GitHub Copilot enabled
4. **Test typical tasks**:
   - Ask Copilot to create a new component/function
   - Request refactoring of existing code
   - Ask for test cases
   - Request documentation
5. **Verify Copilot follows the rules**:
   - Naming conventions applied?
   - Correct file locations?
   - Tech stack specifics respected?
   - Commands suggested when appropriate?
6. **Iterate**: Adjust template if behavior doesn't match intent

### Common Issues

- **Copilot ignores standards**: Make rules more explicit ("Always use X" not "Prefer X")
- **Wrong tech stack**: Add more context, mention specific APIs/patterns
- **Files in wrong locations**: Clarify directory purposes in Project Layout
- **Missing commands**: Add them to Workflow section

---

## Examples by Template Type

### Language Template (typescript.md)
- **Role**: Focus on language expertise (type safety, features)
- **Context**: Language version, runtime environment
- **Layout**: Generic patterns (src/, tests/, types/)
- **Standards**: Language-specific rules (naming, type usage)
- **Commands**: Generic tooling (tsc, linting)

### Framework Template (nextjs.md)
- **Role**: Framework expertise + architectural guidance
- **Context**: Framework version + key features (App Router vs Pages)
- **Layout**: Framework-specific structure (app/, pages/, api/)
- **Standards**: Framework conventions + best practices
- **Commands**: Framework-specific commands (next dev, next build)

### Role Template (security-expert.md)
- **Role**: Security mindset and priorities
- **Context**: Security tools and libraries
- **Layout**: Where security-critical code lives
- **Standards**: Security-focused rules (input validation, auth patterns)
- **Commands**: Security auditing and testing tools

---

## Next Steps

After creating a template:
1. ✅ Use this structure guide to ensure all sections are complete
2. ✅ Test the template in a real project
3. ✅ Follow the contribution guidelines in [CONTRIBUTING.md](../CONTRIBUTING.md)
4. ✅ Submit a pull request with your template

For questions or discussions about template structure, open an issue using the [new-template issue template](../.github/ISSUE_TEMPLATE/new-template.md).
