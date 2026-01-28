# GitHub Copilot Instructions Templates

A curated collection of custom instruction templates for GitHub Copilot (`.github/copilot-instructions.md`) organized by language, framework, and role.

## 🚀 Quick Start

1. Browse the [templates directory](templates/) to find instructions that match your tech stack
2. Copy the relevant `.md` file(s) to your project's `.github/` directory as `copilot-instructions.md`
3. Customize the instructions to fit your specific project needs
4. See [examples/](examples/) for combined template examples

## 📚 Template Catalog

### Languages
- [TypeScript](templates/languages/typescript.md) - Strict typing, ESLint, modern JS features
- [Python](templates/languages/python.md) - Python 3.12+, Poetry, pytest, type hints
- [Go](templates/languages/go.md) - Idiomatic Go, concurrent patterns, standard library
- [Rust](templates/languages/rust.md) - Memory safety, ownership, zero-cost abstractions

### Frameworks
- [Next.js](templates/frameworks/nextjs.md) - App Router, Server Components, RSC patterns
- [FastAPI](templates/frameworks/fastapi.md) - Async Python, Pydantic v2, SQLAlchemy 2.0
- [React + Tailwind](templates/frameworks/react-tailwind.md) - Component patterns, utility-first CSS
- [NestJS](templates/frameworks/nestjs.md) - TypeScript backend, DI, microservices

### Roles
- [Security Expert](templates/roles/security-expert.md) - OWASP, secure coding, threat modeling
- [Refactoring Specialist](templates/roles/refactoring-specialist.md) - Clean code, design patterns
- [Test Engineer](templates/roles/test-engineer.md) - TDD, high coverage, testing strategies

## 📊 Template Matrix

| Template | Category | Primary Tech | Difficulty | Best Combined With |
|----------|----------|--------------|------------|-------------------|
| [TypeScript](templates/languages/typescript.md) | Language | TypeScript 5.3+ | ⭐⭐ | Next.js, NestJS, React+Tailwind |
| [Python](templates/languages/python.md) | Language | Python 3.12+ | ⭐⭐ | FastAPI |
| [Go](templates/languages/go.md) | Language | Go 1.21+ | ⭐⭐⭐ | - |
| [Rust](templates/languages/rust.md) | Language | Rust 1.75+ | ⭐⭐⭐⭐ | - |
| [Next.js](templates/frameworks/nextjs.md) | Framework | React, TypeScript | ⭐⭐⭐ | TypeScript, React+Tailwind, Security Expert |
| [FastAPI](templates/frameworks/fastapi.md) | Framework | Python, Async | ⭐⭐⭐ | Python, Test Engineer, Security Expert |
| [React+Tailwind](templates/frameworks/react-tailwind.md) | Framework | React, CSS | ⭐⭐ | TypeScript, Next.js |
| [NestJS](templates/frameworks/nestjs.md) | Framework | TypeScript, Node.js | ⭐⭐⭐ | TypeScript, Test Engineer |
| [Security Expert](templates/roles/security-expert.md) | Role | Security | ⭐⭐⭐ | Any framework |
| [Refactoring Specialist](templates/roles/refactoring-specialist.md) | Role | Code Quality | ⭐⭐ | Any |
| [Test Engineer](templates/roles/test-engineer.md) | Role | Testing | ⭐⭐⭐ | Any framework |

## 💡 Use Case Guides

### Starting a New Project

**Full-Stack Web App (TypeScript + React)**
- Primary: [Next.js](templates/frameworks/nextjs.md) or [React+Tailwind](templates/frameworks/react-tailwind.md)
- Language: [TypeScript](templates/languages/typescript.md)
- Add: [Security Expert](templates/roles/security-expert.md)
- 📄 [See example](examples/full-stack-web.md)

**API Backend (Python)**
- Primary: [FastAPI](templates/frameworks/fastapi.md)
- Language: [Python](templates/languages/python.md)
- Add: [Test Engineer](templates/roles/test-engineer.md) + [Security Expert](templates/roles/security-expert.md)
- 📄 [See example](examples/api-backend.md)

**API Backend (TypeScript)**
- Primary: [NestJS](templates/frameworks/nestjs.md)
- Language: [TypeScript](templates/languages/typescript.md)
- Add: [Test Engineer](templates/roles/test-engineer.md) + [Security Expert](templates/roles/security-expert.md)
- 📄 [See example](examples/api-backend.md)

**Mobile App (React Native)**
- Primary: [React+Tailwind](templates/frameworks/react-tailwind.md) (adapt for React Native)
- Language: [TypeScript](templates/languages/typescript.md)
- Add: [Security Expert](templates/roles/security-expert.md)
- 📄 [See example](examples/mobile-app.md)

### Working on Legacy Code

**Improving Code Quality**
- Add: [Refactoring Specialist](templates/roles/refactoring-specialist.md)
- Combine with your language template (TypeScript, Python, etc.)

**Adding Tests to Untested Code**
- Add: [Test Engineer](templates/roles/test-engineer.md)
- Combine with your framework template

**Security Audit & Fixes**
- Add: [Security Expert](templates/roles/security-expert.md)
- Works with any existing codebase

### Code Review & Maintenance

**Reviewing Pull Requests**
- Use: [Refactoring Specialist](templates/roles/refactoring-specialist.md) + [Security Expert](templates/roles/security-expert.md)
- Ask Copilot to review code for patterns, security issues, and best practices

**Writing Documentation**
- Use your language/framework template
- Ask Copilot to generate inline documentation following your conventions

## 📖 Documentation

- [Contributing Guide](CONTRIBUTING.md) - How to add new templates
- [Template Structure](docs/template-structure.md) - Standard template format
- [Best Practices](docs/best-practices.md) - Writing effective Copilot instructions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to add new templates.

## 📄 License

MIT License - feel free to use these templates in your projects!
