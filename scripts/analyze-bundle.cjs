#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundleSize() {
  const distPath = path.join(process.cwd(), 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.log(colorize('❌ Dist folder not found. Run npm run build first.', 'red'));
    process.exit(1);
  }

  console.log(colorize('📊 Bundle Analysis Report', 'cyan'));
  console.log(colorize('=' .repeat(50), 'cyan'));

  const files = [];
  
  function scanDirectory(dir, basePath = '') {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const relativePath = path.join(basePath, item);
      const stats = fs.statSync(fullPath);
      
      if (stats.isDirectory()) {
        scanDirectory(fullPath, relativePath);
      } else {
        files.push({
          path: relativePath,
          size: stats.size,
          type: path.extname(item).toLowerCase()
        });
      }
    });
  }
  
  scanDirectory(distPath);
  
  // Group files by type
  const fileTypes = {};
  let totalSize = 0;
  
  files.forEach(file => {
    if (!fileTypes[file.type]) {
      fileTypes[file.type] = {
        count: 0,
        size: 0,
        files: []
      };
    }
    
    fileTypes[file.type].count++;
    fileTypes[file.type].size += file.size;
    fileTypes[file.type].files.push(file);
    totalSize += file.size;
  });
  
  // Sort files by size
  Object.keys(fileTypes).forEach(type => {
    fileTypes[type].files.sort((a, b) => b.size - a.size);
  });
  
  console.log(colorize(`\n📁 Total Bundle Size: ${formatBytes(totalSize)}`, 'bright'));
  console.log(colorize('-'.repeat(50), 'yellow'));
  
  // Display by file type
  Object.entries(fileTypes)
    .sort((a, b) => b[1].size - a[1].size)
    .forEach(([type, info]) => {
      const percentage = ((info.size / totalSize) * 100).toFixed(1);
      console.log(colorize(`\n${type || 'no extension'} files:`, 'magenta'));
      console.log(`  Count: ${info.count}`);
      console.log(`  Size: ${formatBytes(info.size)} (${percentage}%)`);
      
      // Show largest files of this type
      if (info.files.length > 0) {
        console.log('  Largest files:');
        info.files.slice(0, 3).forEach(file => {
          console.log(`    ${file.path}: ${formatBytes(file.size)}`);
        });
      }
    });
  
  // Performance recommendations
  console.log(colorize('\n🚀 Performance Recommendations:', 'green'));
  console.log(colorize('-'.repeat(50), 'green'));
  
  const jsFiles = fileTypes['.js'] || { size: 0, files: [] };
  const cssFiles = fileTypes['.css'] || { size: 0, files: [] };
  
  if (jsFiles.size > 500 * 1024) { // 500KB
    console.log(colorize('⚠️  JavaScript bundle is large. Consider:', 'yellow'));
    console.log('   - Code splitting');
    console.log('   - Tree shaking');
    console.log('   - Lazy loading components');
  }
  
  if (cssFiles.size > 100 * 1024) { // 100KB
    console.log(colorize('⚠️  CSS bundle is large. Consider:', 'yellow'));
    console.log('   - Purging unused CSS');
    console.log('   - CSS code splitting');
  }
  
  // Check for duplicate dependencies
  const potentialDuplicates = jsFiles.files.filter(file => 
    file.path.includes('vendor') || file.path.includes('chunk')
  );
  
  if (potentialDuplicates.length > 3) {
    console.log(colorize('⚠️  Many chunk files detected. Consider:', 'yellow'));
    console.log('   - Optimizing chunk splitting strategy');
    console.log('   - Reviewing manual chunks configuration');
  }
  
  console.log(colorize('\n✅ Analysis complete!', 'green'));
  
  // Performance budget check
  const budgets = {
    total: 2 * 1024 * 1024, // 2MB
    js: 1 * 1024 * 1024,    // 1MB
    css: 200 * 1024         // 200KB
  };
  
  console.log(colorize('\n📋 Performance Budget Check:', 'blue'));
  console.log(colorize('-'.repeat(50), 'blue'));
  
  const checks = [
    { name: 'Total Bundle', current: totalSize, budget: budgets.total },
    { name: 'JavaScript', current: jsFiles.size, budget: budgets.js },
    { name: 'CSS', current: cssFiles.size, budget: budgets.css }
  ];
  
  checks.forEach(check => {
    const percentage = (check.current / check.budget * 100).toFixed(1);
    const status = check.current <= check.budget ? '✅' : '❌';
    const color = check.current <= check.budget ? 'green' : 'red';
    
    console.log(colorize(
      `${status} ${check.name}: ${formatBytes(check.current)} / ${formatBytes(check.budget)} (${percentage}%)`,
      color
    ));
  });
}

// Run analysis
try {
  analyzeBundleSize();
} catch (error) {
  console.error(colorize('❌ Error analyzing bundle:', 'red'), error.message);
  process.exit(1);
} 