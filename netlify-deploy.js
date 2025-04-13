import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🚀 Starting Netlify deployment preparation');

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure client build directory exists
const clientDir = path.join(__dirname, 'build', 'client');
if (!fs.existsSync(clientDir)) {
  fs.mkdirSync(clientDir, { recursive: true });
  console.log(`📁 Created client build directory at ${clientDir}`);
} else {
  console.log(`📁 Using existing client build directory at ${clientDir}`);
}

// Create _redirects file for SPA routing
const redirectsContent = '/* /index.html 200';
const redirectsPath = path.join(clientDir, '_redirects');
fs.writeFileSync(redirectsPath, redirectsContent);
console.log('✅ Created _redirects file in client build directory');

// Create netlify.toml in client build directory
const netlifyTomlPath = path.join(clientDir, 'netlify.toml');
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
console.log('✅ Created netlify.toml in client build directory');

console.log('✅ Netlify deployment preparation complete'); 