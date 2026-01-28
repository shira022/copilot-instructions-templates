export interface TemplateFrontmatter {
  title: string;
  category: 'language' | 'framework' | 'role';
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  version?: string;
  lastUpdated?: string;
  maintainer?: string;
  requires?: string[];
  applyTo?: string;
  combinableWith?: string[];
  primaryTech?: string;
  minVersions?: Record<string, string>;
  deprecated?: boolean;
  deprecationMessage?: string;
}

export interface Template {
  path: string;
  filename: string;
  id: string;
  frontmatter?: TemplateFrontmatter;
  content: string;
  hasValidStructure: boolean;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}
