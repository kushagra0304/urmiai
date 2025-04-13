import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🚀 Starting Netlify deployment preparation');

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure build directory exists
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
  console.log(`📁 Created build directory at ${buildDir}`);
} else {
  console.log(`📁 Using existing build directory at ${buildDir}`);
}

// Copy _redirects file to build directory
const redirectsContent = '/* /index.html 200';
fs.writeFileSync(path.join(buildDir, '_redirects'), redirectsContent);
console.log('✅ Created _redirects file in build directory');

// If client directory exists, also add _redirects there
const clientDir = path.join(buildDir, 'client');
if (fs.existsSync(clientDir)) {
  fs.writeFileSync(path.join(clientDir, '_redirects'), redirectsContent);
  console.log('✅ Created _redirects file in build/client directory');
} else {
  console.log('❓ build/client directory not found, skipping client redirects');
}

// Also create an empty netlify.toml in build directory to ensure it's used
const netlifyTomlPath = path.join(buildDir, 'netlify.toml');
const netlifyTomlContent = `
[build]
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true
`;

fs.writeFileSync(netlifyTomlPath, netlifyTomlContent);
console.log('✅ Created netlify.toml in build directory');

console.log('✅ Netlify deployment preparation complete'); 