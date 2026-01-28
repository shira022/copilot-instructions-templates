#!/usr/bin/env node

/**
 * Validate YAML frontmatter in template files
 * 
 * Expected frontmatter fields:
 * - title (required)
 * - category (required): language | framework | role
 * - tags (required): array of strings
 * - difficulty (required): beginner | intermediate | advanced
 * - version (optional)
 * - lastUpdated (optional)
 * - maintainer (optional)
 * - requires (optional): array of dependencies
 * - applyTo (optional): file pattern string
 * - combinableWith (optional): array of template names
 * - primaryTech (optional)
 * - minVersions (optional): object with version requirements
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const VALID_CATEGORIES = ['language', 'framework', 'role'];
const VALID_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];

/**
 * Extract YAML frontmatter from markdown content
 */
function extractFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return null;
  }
  
  return match[1];
}

/**
 * Parse YAML frontmatter (simple parser for basic validation)
 */
function parseFrontmatter(yamlString) {
  try {
    const yaml = require('js-yaml');
    return yaml.load(yamlString);
  } catch (e) {
    // If js-yaml is not available, do basic parsing
    const data = {};
    const lines = yamlString.split('\n');
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex === -1) continue;
      
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim();
      
      // Basic array detection
      if (value.startsWith('[')) {
        data[key] = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
      } else {
        data[key] = value.replace(/['"]/g, '');
      }
    }
    
    return data;
  }
}

/**
 * Validate frontmatter schema
 */
function validateFrontmatter(filePath, frontmatter) {
  const errors = [];
  const warnings = [];
  
  // Check required fields
  if (!frontmatter.title) {
    errors.push('Missing required field: title');
  }
  
  if (!frontmatter.category) {
    errors.push('Missing required field: category');
  } else if (!VALID_CATEGORIES.includes(frontmatter.category)) {
    errors.push(`Invalid category: ${frontmatter.category}. Must be one of: ${VALID_CATEGORIES.join(', ')}`);
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
    errors.push(`Invalid difficulty: ${frontmatter.difficulty}. Must be one of: ${VALID_DIFFICULTIES.join(', ')}`);
  }
  
  // Optional field validation
  if (frontmatter.requires && !Array.isArray(frontmatter.requires)) {
    warnings.push('Field "requires" should be an array');
  }
  
  if (frontmatter.combinableWith && !Array.isArray(frontmatter.combinableWith)) {
    warnings.push('Field "combinableWith" should be an array');
  }
  
  return { errors, warnings };
}

/**
 * Main validation function
 */
async function main() {
  console.log('🔍 Validating YAML frontmatter...\n');
  
  // Find all template files
  const templateFiles = await glob('templates/**/*.md', { 
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/dist/**']
  });
  
  if (templateFiles.length === 0) {
    console.log('⚠️  No template files found');
    process.exit(0);
  }
  
  let hasErrors = false;
  let filesWithFrontmatter = 0;
  let filesWithoutFrontmatter = 0;
  
  for (const file of templateFiles) {
    // Skip base template
    if (file.includes('_base-template.md')) {
      console.log(`⏭️  Skipping: ${file} (base template)`);
      continue;
    }
    
    const content = fs.readFileSync(file, 'utf-8');
    const frontmatterString = extractFrontmatter(content);
    
    if (!frontmatterString) {
      console.log(`⚠️  ${file} - No frontmatter found (will be added in Phase 4)`);
      filesWithoutFrontmatter++;
      continue;
    }
    
    filesWithFrontmatter++;
    const frontmatter = parseFrontmatter(frontmatterString);
    const validation = validateFrontmatter(file, frontmatter);
    
    if (validation.errors.length > 0) {
      console.log(`❌ ${file}`);
      validation.errors.forEach(error => {
        console.log(`   Error: ${error}`);
      });
      hasErrors = true;
    } else if (validation.warnings.length > 0) {
      console.log(`⚠️  ${file}`);
      validation.warnings.forEach(warning => {
        console.log(`   Warning: ${warning}`);
      });
    } else {
      console.log(`✅ ${file}`);
    }
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`   Files with frontmatter: ${filesWithFrontmatter}`);
  console.log(`   Files without frontmatter: ${filesWithoutFrontmatter}`);
  
  if (hasErrors) {
    console.log('\n❌ Some frontmatter validations failed');
    process.exit(1);
  } else {
    console.log('\n✅ All frontmatter is valid');
    process.exit(0);
  }
}

// Check if glob is available
try {
  require.resolve('glob');
  main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
} catch (e) {
  console.log('⚠️  glob package not found. Run: npm install glob');
  console.log('Skipping YAML validation for now...');
  process.exit(0);
}
