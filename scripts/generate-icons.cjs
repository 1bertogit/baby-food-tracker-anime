// Simple icon generator using Canvas API (Node.js)
const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create a simple colored rectangle for each size
const generateIcon = (size) => {
  // Create SVG content for the icon
  const svgContent = `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="256" cy="256" r="240" fill="url(#bg)" stroke="#ffffff" stroke-width="8"/>
  
  <!-- Baby bottle icon -->
  <g transform="translate(256,256)">
    <!-- Bottle body -->
    <rect x="-40" y="-80" width="80" height="120" rx="20" fill="#ffffff" stroke="#d1d5db" stroke-width="3" opacity="0.9"/>
    
    <!-- Bottle neck -->
    <rect x="-20" y="-100" width="40" height="20" fill="#ffffff" stroke="#d1d5db" stroke-width="3" opacity="0.9"/>
    
    <!-- Bottle cap -->
    <rect x="-25" y="-110" width="50" height="15" rx="7" fill="#fbbf24" stroke="#f59e0b" stroke-width="2"/>
    
    <!-- Milk level -->
    <rect x="-35" y="-20" width="70" height="50" rx="15" fill="#fef3c7" opacity="0.8"/>
    
    <!-- Apple decoration -->
    <circle cx="60" cy="60" r="25" fill="#ef4444"/>
    <circle cx="60" cy="55" r="20" fill="#dc2626"/>
    <rect x="58" y="30" width="4" height="8" fill="#16a34a"/>
  </g>
  
  <!-- Size indicator -->
  <circle cx="256" cy="420" r="50" fill="#ffffff" stroke="#8b5cf6" stroke-width="4"/>
  <text x="256" y="430" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#8b5cf6">BF</text>
</svg>`;

  return svgContent;
};

// Generate icons
const iconsDir = path.join(__dirname, '../public/icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons for each size (we'll treat them as PNG in the manifest)
sizes.forEach(size => {
  const iconContent = generateIcon(size);
  const filename = path.join(iconsDir, `icon-${size}x${size}.svg`);
  fs.writeFileSync(filename, iconContent);
  console.log(`Generated icon: ${size}x${size}`);
});

console.log('All icons generated successfully!');