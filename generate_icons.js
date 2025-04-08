#!/usr/bin/env node

/**
 * Script to generate icon PNG files for Chrome extension
 * Requires the canvas npm package
 * 
 * To install dependencies: npm install canvas
 * To run: node generate_icons.js
 */

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Make sure the src directory exists
const srcDir = path.join(__dirname, 'src');
if (!fs.existsSync(srcDir)) {
  console.error('Error: src directory not found');
  process.exit(1);
}

// Function to draw the icon on a canvas
function drawIcon(canvas) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width * 0.45; // Outer circle radius
  
  // Clear canvas
  ctx.clearRect(0, 0, width, height);
  
  // Draw outer circle (blue background)
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.fillStyle = '#4285F4';
  ctx.fill();
  
  // Draw inner circle (white)
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.85, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();
  
  // Draw arrow path (scaled for each canvas size)
  ctx.beginPath();
  
  // Scale factor based on canvas size
  const s = width / 128;
  
  // Starting point - left side
  ctx.moveTo(40 * s, 45 * s);
  
  // Curve to top
  ctx.bezierCurveTo(
    40 * s, 30 * s,
    55 * s, 30 * s,
    70 * s, 35 * s
  );
  
  // Line to arrow head top
  ctx.lineTo(70 * s, 25 * s);
  
  // Arrow head right point
  ctx.lineTo(95 * s, 45 * s);
  
  // Arrow head bottom point
  ctx.lineTo(70 * s, 65 * s);
  
  // Line back to curve
  ctx.lineTo(70 * s, 55 * s);
  
  // Curve down and around
  ctx.bezierCurveTo(
    55 * s, 50 * s,
    40 * s, 55 * s,
    40 * s, 70 * s
  );
  
  // Bottom curve
  ctx.bezierCurveTo(
    40 * s, 85 * s,
    55 * s, 95 * s,
    70 * s, 90 * s
  );
  
  // Right side curve
  ctx.bezierCurveTo(
    85 * s, 85 * s,
    90 * s, 70 * s,
    85 * s, 60 * s
  );
  
  // Line to right edge
  ctx.lineTo(100 * s, 60 * s);
  
  // Curve back to bottom
  ctx.bezierCurveTo(
    105 * s, 80 * s,
    95 * s, 105 * s,
    70 * s, 105 * s
  );
  
  // Curve to complete the path
  ctx.bezierCurveTo(
    45 * s, 105 * s,
    25 * s, 85 * s,
    40 * s, 45 * s
  );
  
  // Fill and stroke the path
  ctx.fillStyle = '#4285F4';
  ctx.fill();
  ctx.strokeStyle = '#2A56C6';
  ctx.lineWidth = Math.max(1, 2 * s);
  ctx.stroke();
}

// Function to create and save an icon
function createIcon(size) {
  console.log(`Generating ${size}x${size} icon...`);
  
  // Create canvas
  const canvas = createCanvas(size, size);
  
  // Draw icon on canvas
  drawIcon(canvas);
  
  // Save canvas to PNG file
  const fileName = `icon-${size}.png`;
  const filePath = path.join(srcDir, fileName);
  
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filePath, buffer);
  
  console.log(`Created ${filePath}`);
}

// Generate icons in all required sizes
console.log('Generating icon PNG files...');
[16, 48, 128].forEach(size => createIcon(size));
console.log('Icon generation complete!');

console.log('\nTo install the canvas package, run:');
console.log('npm install canvas');

