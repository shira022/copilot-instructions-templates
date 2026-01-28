import fs from 'fs/promises';
import path from 'path';
import { glob } from 'glob';
import yaml from 'js-yaml';
import type { Template, TemplateFrontmatter } from '../types/template.js';

const REQUIRED_SECTIONS = [
  /^##\s+Role\s*\/\s*Identity/i,
  /^##\s+Context\s*&\s*Tech\s+Stack/i,
  /^##\s+Project\s+Layout/i,
  /^##\s+Coding\s+Standards/i,
  /^##\s+Workflow\s*&\s*Commands/i,
];

/**
 * Extract YAML frontmatter from markdown content
 */
export function extractFrontmatter(content: string): string | null {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  return match ? match[1] : null;
}

/**
 * Parse YAML frontmatter
 */
export function parseFrontmatter(yamlString: string): TemplateFrontmatter | null {
  try {
    return yaml.load(yamlString) as TemplateFrontmatter;
  } catch (error) {
    console.error('Error parsing frontmatter:', error);
    return null;
  }
}

/**
 * Check if template has all required sections
 */
export function hasValidStructure(content: string): boolean {
  const lines = content.split('\n');
  const foundSections = REQUIRED_SECTIONS.map(() => false);

  for (const line of lines) {
    REQUIRED_SECTIONS.forEach((pattern, index) => {
      if (pattern.test(line.trim())) {
        foundSections[index] = true;
      }
    });
  }

  return foundSections.every((found) => found);
}

/**
 * Load a single template file
 */
export async function loadTemplate(filePath: string): Promise<Template> {
  const content = await fs.readFile(filePath, 'utf-8');
  const filename = path.basename(filePath);
  const id = filename.replace('.md', '');

  const frontmatterString = extractFrontmatter(content);
  const frontmatter = frontmatterString ? parseFrontmatter(frontmatterString) : undefined;

  return {
    path: filePath,
    filename,
    id,
    frontmatter,
    content,
    hasValidStructure: hasValidStructure(content),
  };
}

/**
 * Load all templates from a directory
 */
export async function loadTemplates(pattern: string = 'templates/**/*.md'): Promise<Template[]> {
  const files = await glob(pattern, {
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/dist/**', '**/_base-template.md'],
  });

  const templates = await Promise.all(files.map((file) => loadTemplate(file)));
  return templates;
}

/**
 * Filter templates by criteria
 */
export function filterTemplates(
  templates: Template[],
  filters: {
    category?: string;
    tag?: string;
    difficulty?: string;
  }
): Template[] {
  return templates.filter((template) => {
    if (!template.frontmatter) return false;

    if (filters.category && template.frontmatter.category !== filters.category) {
      return false;
    }

    if (filters.tag && !template.frontmatter.tags.includes(filters.tag)) {
      return false;
    }

    if (filters.difficulty && template.frontmatter.difficulty !== filters.difficulty) {
      return false;
    }

    return true;
  });
}
