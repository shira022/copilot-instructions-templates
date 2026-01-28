#!/usr/bin/env node

/**
 * Check that all template files contain the required 5 sections
 * 
 * Required sections:
 * 1. ## Role / Identity
 * 2. ## Context & Tech Stack
 * 3. ## Project Layout
 * 4. ## Coding Standards
 * 5. ## Workflow & Commands
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const REQUIRED_SECTIONS = [
  '## Role / Identity',
  '## Context & Tech Stack',
  '## Project Layout',
  '## Coding Standards',
  '## Workflow & Commands'
];

// Alternative heading formats (some templates might use different cases)
const SECTION_PATTERNS = [
  /^##\s+Role\s*\/\s*Identity/i,
  /^##\s+Context\s*&\s*Tech\s+Stack/i,
  /^##\s+Project\s+Layout/i,
  /^##\s+Coding\s+Standards/i,
  /^##\s+Workflow\s*&\s*Commands/i
];

/**
 * Check if a template file contains all required sections
 */
function validateTemplate(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const foundSections = SECTION_PATTERNS.map(() => false);
  
  for (const line of lines) {
    SECTION_PATTERNS.forEach((pattern, index) => {
      if (pattern.test(line.trim())) {
        foundSections[index] = true;
      }
    });
  }
  
  const missingSections = [];
  foundSections.forEach((found, index) => {
    if (!found) {
      missingSections.push(REQUIRED_SECTIONS[index]);
    }
  });
  
  return {
    valid: missingSections.length === 0,
    missingSections
  };
}

/**
 * Main validation function
 */
async function main() {
  console.log('🔍 Checking template structure...\n');
  
  // Find all template files
  const templateFiles = await glob('templates/**/*.md', { 
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/dist/**']
  });
  
  // Also check example files
  const exampleFiles = await glob('examples/**/*.md', {
    cwd: process.cwd(),
    ignore: ['**/node_modules/**', '**/dist/**']
  });
  
  const allFiles = [...templateFiles, ...exampleFiles];
  
  if (allFiles.length === 0) {
    console.log('⚠️  No template files found');
    process.exit(0);
  }
  
  let hasErrors = false;
  
  for (const file of allFiles) {
    // Skip base template as it's just a template
    if (file.includes('_base-template.md')) {
      console.log(`⏭️  Skipping: ${file} (base template)`);
      continue;
    }
    
    const result = validateTemplate(file);
    
    if (result.valid) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file}`);
      console.log(`   Missing sections:`);
      result.missingSections.forEach(section => {
        console.log(`   - ${section}`);
      });
      hasErrors = true;
    }
  }
  
  console.log(`\n📊 Checked ${allFiles.length} files`);
  
  if (hasErrors) {
    console.log('\n❌ Some templates are missing required sections');
    process.exit(1);
  } else {
    console.log('\n✅ All templates have the required structure');
    process.exit(0);
  }
}

// Check if glob is available, if not provide helpful message
try {
  require.resolve('glob');
  main().catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
} catch (e) {
  console.log('⚠️  glob package not found. Run: npm install glob');
  console.log('Skipping section validation for now...');
  process.exit(0);
}
