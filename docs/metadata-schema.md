# Metadata Schema for Templates

This document defines the YAML frontmatter schema for GitHub Copilot instruction templates.

## Overview

All templates in this repository use YAML frontmatter to provide metadata that enables:
- Automated validation and quality checks
- Filtering and searching in CLI tools
- Compatibility checking when combining templates
- Version tracking and dependency management

## Schema Definition

### Required Fields

```yaml
---
title: "Template Display Name"
category: "language"  # language | framework | role
tags: ["tag1", "tag2", "tag3"]
difficulty: "intermediate"  # beginner | intermediate | advanced
---
```

#### `title` (string, required)
The human-readable name of the template.

**Format**: `"[Technology/Role Name] - GitHub Copilot Instructions"`

**Examples**:
- `"TypeScript - GitHub Copilot Instructions"`
- `"Next.js - GitHub Copilot Instructions"`
- `"Security Expert - GitHub Copilot Instructions"`

#### `category` (enum, required)
The primary category of the template.

**Valid values**:
- `language` - Programming language templates (TypeScript, Python, Go, Rust)
- `framework` - Framework-specific templates (Next.js, FastAPI, React+Tailwind)
- `role` - Role-based templates (Security Expert, Test Engineer, Refactoring Specialist)

#### `tags` (array of strings, required)
Descriptive tags for filtering and searching.

**Guidelines**:
- Use lowercase
- Include technology names, use cases, and key features
- Minimum: 3 tags
- Maximum: 10 tags

**Examples**:
```yaml
tags: ["typescript", "javascript", "nodejs", "type-safety", "strict-mode"]
tags: ["nextjs", "react", "ssr", "app-router", "frontend"]
tags: ["security", "owasp", "authentication", "authorization"]
```

#### `difficulty` (enum, required)
The complexity level of using this template.

**Valid values**:
- `beginner` (⭐) - Basic concepts, minimal configuration
- `intermediate` (⭐⭐ or ⭐⭐⭐) - Requires some experience
- `advanced` (⭐⭐⭐⭐) - Complex patterns, expert knowledge required

**Guidelines**:
- Languages: typically `intermediate`
- Frameworks: typically `intermediate` to `advanced`
- Roles: varies based on specialization

### Optional Fields

```yaml
---
# ... required fields ...

version: "1.0.0"
lastUpdated: "2026-01-28"
maintainer: "Community"
requires: ["nodejs", "npm"]
applyTo: "**/*.{ts,tsx}"
combinableWith: ["nextjs", "react-tailwind", "security-expert"]
primaryTech: "TypeScript 5.3+"
minVersions:
  typescript: "5.3"
  node: "20"
deprecated: false
deprecationMessage: ""
---
```

#### `version` (string, optional)
Semantic version of the template.

**Format**: `"MAJOR.MINOR.PATCH"` (SemVer)

**Example**: `"1.0.0"`

#### `lastUpdated` (string, optional)
ISO 8601 date when the template was last updated.

**Format**: `"YYYY-MM-DD"`

**Example**: `"2026-01-28"`

#### `maintainer` (string, optional)
Individual or organization maintaining the template.

**Default**: `"Community"`

**Examples**: `"Community"`, `"@username"`, `"Organization Name"`

#### `requires` (array of strings, optional)
External dependencies or prerequisites.

**Examples**:
```yaml
requires: ["nodejs", "npm"]
requires: ["python", "poetry"]
requires: ["docker", "docker-compose"]
```

#### `applyTo` (string, optional)
Glob pattern for files this template applies to.

**Format**: Glob pattern string

**Examples**:
```yaml
applyTo: "**/*.{ts,tsx}"  # TypeScript files
applyTo: "**/*.py"        # Python files
applyTo: "app/**/*.tsx"   # Next.js App Router files
applyTo: "src/**/*"       # All source files
```

#### `combinableWith` (array of strings, optional)
Other template names that work well with this one.

**Format**: Array of template IDs (filename without `.md`)

**Examples**:
```yaml
# TypeScript template
combinableWith: ["nextjs", "nestjs", "react-tailwind"]

# Next.js template
combinableWith: ["typescript", "react-tailwind", "security-expert", "test-engineer"]

# Security Expert template
combinableWith: ["nextjs", "fastapi", "nestjs"]  # Works with most frameworks
```

#### `primaryTech` (string, optional)
Primary technology and version.

**Format**: `"Technology Version+"`

**Examples**:
- `"TypeScript 5.3+"`
- `"Python 3.12+"`
- `"Next.js 14+"`

#### `minVersions` (object, optional)
Minimum version requirements for technologies.

**Format**: Key-value pairs of technology: version

**Examples**:
```yaml
minVersions:
  typescript: "5.3"
  node: "20"
  react: "18"
```

```yaml
minVersions:
  python: "3.12"
  fastapi: "0.109"
```

#### `deprecated` (boolean, optional)
Whether this template is deprecated.

**Default**: `false`

**Usage**: Set to `true` when a template is no longer recommended

#### `deprecationMessage` (string, optional)
Message explaining deprecation and alternatives.

**Example**:
```yaml
deprecated: true
deprecationMessage: "Use the new Next.js 15 template instead: templates/frameworks/nextjs-15.md"
```

## Complete Examples

### Language Template Example

```yaml
---
title: "TypeScript - GitHub Copilot Instructions"
category: "language"
tags: ["typescript", "javascript", "nodejs", "type-safety", "strict-mode"]
difficulty: "intermediate"
version: "1.0.0"
lastUpdated: "2026-01-28"
maintainer: "Community"
requires: ["nodejs"]
applyTo: "**/*.{ts,tsx,mts,cts}"
combinableWith: ["nextjs", "nestjs", "react-tailwind"]
primaryTech: "TypeScript 5.3+"
minVersions:
  typescript: "5.3"
  node: "20"
deprecated: false
---
```

### Framework Template Example

```yaml
---
title: "Next.js - GitHub Copilot Instructions"
category: "framework"
tags: ["nextjs", "react", "typescript", "ssr", "app-router", "frontend"]
difficulty: "advanced"
version: "1.0.0"
lastUpdated: "2026-01-28"
maintainer: "Community"
requires: ["typescript", "react", "nodejs"]
applyTo: "app/**/*.{ts,tsx}"
combinableWith: ["typescript", "react-tailwind", "security-expert", "test-engineer"]
primaryTech: "Next.js 14+"
minVersions:
  nextjs: "14.0"
  react: "18.0"
  typescript: "5.3"
  node: "20"
deprecated: false
---
```

### Role Template Example

```yaml
---
title: "Security Expert - GitHub Copilot Instructions"
category: "role"
tags: ["security", "owasp", "authentication", "authorization", "cryptography"]
difficulty: "advanced"
version: "1.0.0"
lastUpdated: "2026-01-28"
maintainer: "Community"
requires: []
applyTo: "**/*"
combinableWith: ["nextjs", "fastapi", "nestjs", "typescript", "python"]
deprecated: false
---
```

## Validation

Templates are automatically validated using the `scripts/validate-yaml.js` script:

```bash
node scripts/validate-yaml.js
```

### Validation Rules

1. **Required fields must be present**: `title`, `category`, `tags`, `difficulty`
2. **Category must be valid**: One of `language`, `framework`, `role`
3. **Difficulty must be valid**: One of `beginner`, `intermediate`, `advanced`
4. **Tags must be an array**: With at least 1 tag
5. **Optional arrays must be arrays**: `requires`, `combinableWith`
6. **Versions should follow SemVer**: If present
7. **Dates should be ISO 8601**: If present

## Migration Guide

### Adding Frontmatter to Existing Templates

1. **Open the template file**
2. **Add frontmatter at the top**:
   ```yaml
   ---
   title: "Template Name"
   category: "language"
   tags: ["tag1", "tag2"]
   difficulty: "intermediate"
   ---
   
   # Template Name
   ```
3. **Validate**:
   ```bash
   node scripts/validate-yaml.js
   ```
4. **Commit changes**

### Testing Compatibility

Use the CLI tool to check if templates are compatible:

```bash
npx copilot-instructions-templates check-compatibility typescript nextjs react-tailwind
```

## CLI Integration

The metadata is used by the CLI tool for:

### Filtering
```bash
# By category
npx copilot-instructions-templates list --category=framework

# By tag
npx copilot-instructions-templates list --tag=frontend

# By difficulty
npx copilot-instructions-templates list --difficulty=beginner
```

### Searching
```bash
# Search by keyword
npx copilot-instructions-templates search "react"
```

### Compatibility Checking
```bash
# Check if templates can be combined
npx copilot-instructions-templates check-compatibility nextjs typescript security-expert
```

### Version Requirements
```bash
# Show version requirements
npx copilot-instructions-templates requirements nextjs
```

## Best Practices

### Tags
- ✅ Use specific, searchable terms
- ✅ Include primary technology and related technologies
- ✅ Add use case tags (`frontend`, `backend`, `fullstack`, `mobile`)
- ❌ Avoid generic tags like `programming`, `code`
- ❌ Don't duplicate the category name

### Difficulty
- **Beginner**: Basic syntax, minimal configuration
- **Intermediate**: Requires understanding of the ecosystem
- **Advanced**: Complex patterns, architectural decisions

### Combinability
- List templates that are frequently used together
- Consider technical compatibility (e.g., TypeScript + Next.js)
- Include role templates that enhance the base template

### Version Requirements
- Specify minimum versions that are still supported
- Use `+` to indicate "or higher" (e.g., `5.3+`)
- Keep versions up-to-date with LTS or stable releases

## Future Extensions

Planned additions to the schema:

- `examples`: Links to example projects using the template
- `relatedDocs`: Links to official documentation
- `migrations`: Migration guides from previous versions
- `contributors`: Array of contributor usernames
- `license`: License information for template-specific content

---

**Schema Version**: 1.0  
**Last Updated**: 2026-01-28  
**Maintainer**: Community
