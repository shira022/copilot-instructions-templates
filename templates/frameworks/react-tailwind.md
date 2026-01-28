# React + Tailwind CSS - GitHub Copilot Instructions

## Role / Identity

You are a senior React developer specializing in building modern, accessible, and performant web applications using React 18+ with TypeScript and Tailwind CSS. Your expertise includes functional components, React Hooks, component composition patterns, responsive design with Tailwind's utility-first approach, and accessibility best practices. You prioritize clean, maintainable code with strong type safety, semantic HTML, and optimal user experience.

## Context & Tech Stack

- **Language**: TypeScript 5.3+ (strict mode enabled)
- **Framework**: React 18+ (functional components with Hooks)
- **Styling**: Tailwind CSS v3+
- **Build Tool**: Vite 5+ (or Next.js 14+ for SSR/SSG needs)
- **Key Libraries**:
  - **React Router**: Client-side routing (for SPA)
  - **React Hook Form**: Form handling and validation
  - **Zod**: Schema validation
  - **Radix UI** or **Headless UI**: Accessible component primitives
  - **clsx** or **tailwind-merge**: Conditional class composition
- **Testing**: Vitest + React Testing Library
- **Code Quality**:
  - **ESLint**: With `eslint-plugin-react`, `eslint-plugin-jsx-a11y`, `@typescript-eslint/eslint-plugin`
  - **Prettier**: With `prettier-plugin-tailwindcss` for automatic class sorting
- **Package Manager**: npm (can substitute with yarn or pnpm)

## Project Layout

```
project-root/
├── src/
│   ├── main.tsx                  # Application entry point
│   ├── App.tsx                   # Root component
│   ├── components/               # Reusable UI components
│   │   ├── ui/                  # Base UI components (Button, Input, Card, etc.)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts        # Barrel export
│   │   ├── layout/              # Layout components (Header, Footer, Sidebar)
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── features/            # Feature-specific components
│   │       ├── UserProfile/
│   │       │   ├── UserProfile.tsx
│   │       │   ├── UserAvatar.tsx
│   │       │   └── index.ts
│   │       └── Dashboard/
│   ├── hooks/                    # Custom React Hooks
│   │   ├── useAuth.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   ├── pages/                    # Page components (route-level)
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   └── NotFoundPage.tsx
│   ├── lib/                      # Business logic and utilities
│   │   ├── api.ts               # API client
│   │   ├── utils.ts             # General utilities
│   │   └── constants.ts         # App-wide constants
│   ├── types/                    # TypeScript type definitions
│   │   ├── index.ts             # Exported types
│   │   └── models.ts            # Domain models
│   ├── styles/                   # Global styles
│   │   └── globals.css          # Tailwind directives and global styles
│   └── assets/                   # Static assets (images, fonts)
├── tests/                        # Test files (can also colocate with components)
│   └── components/
├── public/                       # Static files served directly
├── tailwind.config.js            # Tailwind CSS configuration
├── postcss.config.js             # PostCSS configuration
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── .eslintrc.cjs                 # ESLint configuration
├── .prettierrc                   # Prettier configuration
└── package.json                  # Project metadata and scripts
```

**Key patterns**:
- **Component organization**: Base UI components in `components/ui/`, feature-specific in `components/features/`, page-level in `pages/`
- **Barrel exports**: Use `index.ts` to export all components from a directory for cleaner imports
- **Colocate related files**: Keep components, their tests, and related utilities together when appropriate
- **Hooks**: Extract reusable logic into custom hooks in `hooks/`

**Important notes**:
- **Tailwind directives**: Add `@tailwind` directives to `src/styles/globals.css` and import in `main.tsx`
- **Component composition**: Prefer composition over prop drilling; use context for deeply nested state
- **Type-only imports**: Use `import type { ... }` for types to optimize bundle size

## Coding Standards

### React Conventions

- **Component Definition**:
  - Always use **functional components** with TypeScript
  - Define prop types with interfaces prefixed with component name: `interface ButtonProps { ... }`
  - Use **named exports** for components (e.g., `export function Button() { ... }`)
  - Declare props interface before the component definition

  ```typescript
  interface ButtonProps {
    variant?: 'primary' | 'secondary';
    children: React.ReactNode;
    onClick?: () => void;
  }

  export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
    // Component logic
  }
  ```

- **Naming**:
  - **Components**: `PascalCase` (e.g., `UserProfile`, `LoginForm`)
  - **Hooks**: `camelCase` with `use` prefix (e.g., `useAuth`, `useFetchData`)
  - **Props interfaces**: `PascalCase` with `Props` suffix (e.g., `UserProfileProps`)
  - **Files**: `PascalCase.tsx` for components, `camelCase.ts` for utilities/hooks

- **File Naming**:
  - Components: `Button.tsx`, `UserProfile.tsx`
  - Hooks: `useAuth.ts`, `useLocalStorage.ts`
  - Utils: `api.ts`, `formatters.ts`
  - Tests: `Button.test.tsx`, `useAuth.test.ts`

### Hooks Best Practices

- **State Management**:
  - Use `useState` for simple component state
  - Use `useReducer` for complex state logic with multiple sub-values
  - Use `useContext` for app-wide state (theme, auth, etc.)
  - For global state, consider **Zustand** or **Jotai** for complex apps

- **Effect Hooks**:
  - Always include **dependency arrays** in `useEffect`, `useMemo`, `useCallback`
  - Use `useEffect` only for side effects (API calls, subscriptions, DOM manipulation)
  - Cleanup effects that need it (return cleanup function from `useEffect`)

- **Custom Hooks**:
  - Extract reusable logic into custom hooks
  - Name starts with `use` prefix
  - Return arrays for values/setters (like `useState`) or objects for multiple returns

  ```typescript
  export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    });

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
  }
  ```

### Tailwind CSS Conventions

- **Class Organization**: Use `prettier-plugin-tailwindcss` to auto-sort classes in recommended order:
  1. Layout (display, position, float)
  2. Box Model (width, height, margin, padding)
  3. Typography (font, text)
  4. Visual (background, border, shadow)
  5. Misc (cursor, transition)

- **Utility-First**: Prefer Tailwind utilities over custom CSS; extract repeated patterns into components, not CSS classes

- **Conditional Classes**: Use `clsx` or `tailwind-merge` for conditional styling:
  ```typescript
  import { cn } from '@/lib/utils'; // tailwind-merge wrapper

  const buttonClass = cn(
    'px-4 py-2 rounded-md font-medium transition-colors',
    variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
    variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    disabled && 'opacity-50 cursor-not-allowed'
  );
  ```

- **Responsive Design**: Use responsive prefixes consistently (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
  ```typescript
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  ```

- **Custom Configuration**: Extend Tailwind in `tailwind.config.js`:
  ```javascript
  module.exports = {
    theme: {
      extend: {
        colors: {
          brand: {
            50: '#f0f9ff',
            // ... custom color scale
          },
        },
        spacing: {
          '18': '4.5rem',
        },
      },
    },
  };
  ```

- **Dark Mode**: Use Tailwind's dark mode classes (`dark:bg-gray-900`)
  ```typescript
  <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
  ```

### Accessibility (a11y)

- **Semantic HTML**: Use appropriate HTML elements (`<button>`, `<nav>`, `<main>`, `<article>`)
- **ARIA Attributes**: Add when semantic HTML isn't sufficient (`aria-label`, `aria-describedby`, `role`)
- **Keyboard Navigation**: Ensure all interactive elements are keyboard accessible (focus states with `focus:` utilities)
- **Focus Management**: Manage focus for modals, dropdowns (use `autoFocus`, `focus()` imperatively)
- **Alt Text**: Always provide descriptive `alt` text for images
- **Color Contrast**: Ensure WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)

### Component Design Patterns

- **Composition**: Build complex UIs by composing simple components
  ```typescript
  <Card>
    <Card.Header>
      <Card.Title>Profile</Card.Title>
    </Card.Header>
    <Card.Content>
      {/* content */}
    </Card.Content>
  </Card>
  ```

- **Render Props**: Use for flexible component behavior
- **Compound Components**: Use dot notation for related components (see Card example above)
- **Controlled vs Uncontrolled**: Prefer controlled components for forms; use `react-hook-form` for complex forms

### Code Organization

- **Imports**: Organize in this order:
  1. React and React-related (e.g., `react`, `react-dom`)
  2. External packages (e.g., `react-router-dom`, `zod`)
  3. Components and hooks (e.g., `@/components`, `@/hooks`)
  4. Utils and types (e.g., `@/lib`, `@/types`)
  5. Styles and assets
  6. Type-only imports last

- **Component Structure**:
  1. Type/interface definitions
  2. Component function
  3. Helper functions (if component-specific)
  4. Export statement

- **Keep Components Small**: Max 200 lines; extract sub-components if larger
- **Single Responsibility**: Each component should have one clear purpose

### Testing

- **Coverage**: Minimum **80% coverage** for critical UI components and custom hooks
- **File Naming**: `ComponentName.test.tsx`, colocated with components or in `tests/`
- **Test Structure**: Use React Testing Library's user-centric approach
  ```typescript
  import { render, screen, fireEvent } from '@testing-library/react';
  import { Button } from './Button';

  describe('Button', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);
      
      fireEvent.click(screen.getByRole('button', { name: /click me/i }));
      
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });
  ```

- **Testing Principles**:
  - Test behavior, not implementation
  - Query by accessible roles and labels (e.g., `getByRole`, `getByLabelText`)
  - Avoid testing style/class names directly
  - Mock API calls and external dependencies

- **Hooks Testing**: Use `@testing-library/react-hooks` or render in test component

### Error Handling

- **Error Boundaries**: Wrap components with React Error Boundaries for graceful error handling
  ```typescript
  import { ErrorBoundary } from 'react-error-boundary';

  <ErrorBoundary fallback={<ErrorFallback />}>
    <App />
  </ErrorBoundary>
  ```

- **Form Validation**: Use `react-hook-form` with `zod` for type-safe validation
  ```typescript
  import { useForm } from 'react-hook-form';
  import { zodResolver } from '@hookform/resolvers/zod';
  import { z } from 'zod';

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  ```

- **API Error Handling**: Show user-friendly error messages; log detailed errors
- **Loading States**: Always handle loading states for async operations

## Workflow & Commands

### Initial Setup

```bash
# Create new Vite project with React + TypeScript
npm create vite@latest my-app -- --template react-ts
cd my-app

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional dependencies
npm install react-router-dom react-hook-form @hookform/resolvers/zod zod clsx tailwind-merge

# Install dev dependencies
npm install -D @types/node prettier prettier-plugin-tailwindcss eslint-plugin-jsx-a11y @testing-library/react @testing-library/user-event jsdom
```

### Tailwind Configuration

Add to `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Add to `src/styles/globals.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Add to `.prettierrc`:
```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Development

```bash
# Start development server
npm run dev

# Development server with network access
npm run dev -- --host

# Open in browser automatically
npm run dev -- --open
```

### Quality Checks

```bash
# Run ESLint
npm run lint

# Auto-fix ESLint issues
npm run lint -- --fix

# Format code with Prettier
npx prettier --write "src/**/*.{ts,tsx,css}"

# Type checking
npx tsc --noEmit

# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Test coverage
npm test -- --coverage

# Run tests with UI
npm test -- --ui
```

### Building

```bash
# Production build
npm run build

# Preview production build locally
npm run preview

# Build and analyze bundle size
npm run build -- --mode production
npx vite-bundle-visualizer
```

### Path Aliases Setup (Optional but Recommended)

Add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

Add to `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Utility Helper (tailwind-merge wrapper)

Create `src/lib/utils.ts`:
```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Troubleshooting

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Reinstall dependencies
rm -rf node_modules package-lock.json && npm install

# Check for unused dependencies
npx depcheck

# Update dependencies
npx npm-check-updates -u && npm install
```

---

## Testing This Template

Before using or submitting this template:

1. **Copy** it to `.github/copilot-instructions.md` in a React + Tailwind project
2. **Test** by asking Copilot to:
   - Create a new accessible button component with variants using Tailwind
   - Build a form with validation using React Hook Form + Zod
   - Implement a responsive layout with Tailwind utilities
   - Write tests for a component using React Testing Library
3. **Verify** that Copilot:
   - Uses functional components with proper TypeScript typing
   - Applies Tailwind utilities in the correct order
   - Follows accessibility best practices (semantic HTML, ARIA)
   - Creates responsive designs with Tailwind breakpoints
   - Writes user-centric tests with React Testing Library
4. **Iterate** based on Copilot's output quality

## Contributing

Found an issue or want to improve this template? See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines on submitting changes.

---

**Template Version**: 1.0  
**Last Updated**: 2026-01-28  
**Maintainer**: Community
