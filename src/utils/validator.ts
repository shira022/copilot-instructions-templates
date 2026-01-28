import type { Template, ValidationResult, TemplateFrontmatter } from '../types/template.js';

const VALID_CATEGORIES = ['language', 'framework', 'role'];
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];

/**
 * Validate frontmatter schema
 */
export function validateFrontmatter(
  frontmatter: TemplateFrontmatter | undefined
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!frontmatter) {
    warnings.push('No frontmatter found (will be added in Phase 4)');
    return { valid: true, errors, warnings };
  }

  // Required fields
  if (!frontmatter.title) {
    errors.push('Missing required field: title');
  }

  if (!frontmatter.category) {
    errors.push('Missing required field: category');
  } else if (!VALID_CATEGORIES.includes(frontmatter.category)) {
    errors.push(
      `Invalid category: ${frontmatter.category}. Must be one of: ${VALID_CATEGORIES.join(', ')}`
    );
  }

  if (!frontmatter.tags) {
    errors.push('Missing required field: tags');
  } else if (!Array.isArray(frontmatter.tags)) {
    errors.push('Field "tags" must be an array');
  } else if (frontmatter.tags.length === 0) {
    warnings.push('Field "tags" is empty');
  }

  if (!frontmatter.difficulty) {
    errors.push('Missing required field: difficulty');
  } else if (!VALID_DIFFICULTIES.includes(frontmatter.difficulty)) {
    errors.push(
      `Invalid difficulty: ${frontmatter.difficulty}. Must be one of: ${VALID_DIFFICULTIES.join(', ')}`
    );
  }

  // Optional field validation
  if (frontmatter.requires && !Array.isArray(frontmatter.requires)) {
    warnings.push('Field "requires" should be an array');
  }

  if (frontmatter.combinableWith && !Array.isArray(frontmatter.combinableWith)) {
    warnings.push('Field "combinableWith" should be an array');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate template structure
 */
export function validateStructure(template: Template): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!template.hasValidStructure) {
    errors.push('Missing one or more required sections');
    warnings.push('Required sections: Role/Identity, Context & Tech Stack, Project Layout, Coding Standards, Workflow & Commands');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate complete template
 */
export function validateTemplate(template: Template, strict: boolean = false): ValidationResult {
  const frontmatterResult = validateFrontmatter(template.frontmatter);
  const structureResult = validateStructure(template);

  const errors = [...frontmatterResult.errors, ...structureResult.errors];
  const warnings = [...frontmatterResult.warnings, ...structureResult.warnings];

  // In strict mode, warnings are treated as errors
  if (strict) {
    errors.push(...warnings);
    warnings.length = 0;
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
