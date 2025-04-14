import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('🚀 Starting Netlify deployment preparation');

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const buildDir = path.join(__dirname, 'build');
const clientDir = path.join(buildDir, 'client');

console.log(`📁 Using build directory: ${buildDir}`);
console.log(`📁 Using client directory: ${clientDir}`);

// Ensure client directory exists
if (!fs.existsSync(clientDir)) {
  console.log('⚠️ Client directory not found, it should have been created by the build process.');
  console.log('⚠️ Will proceed anyway and create necessary files.');
  fs.mkdirSync(clientDir, { recursive: true });
}

// Create _redirects file for SPA routing with specific route handling
const redirectsContent = `
# Handle direct access to the login page
/login    /index.html    200
/register    /index.html    200
/forgot-password    /index.html    200

# Handle all other routes with client-side routing
/*    /index.html    200
`;

const redirectsPath = path.join(clientDir, '_redirects');
fs.writeFileSync(redirectsPath, redirectsContent);
console.log('✅ Created _redirects file in client build directory');

// Create netlify.toml in client build directory
const netlifyTomlPath = path.join(clientDir, 'netlify.toml');
const netlifyTomlContent = `
[build]
  publish = "."

[[redirects]]
  from = "/login"
  to = "/index.html"
  status = 200
  force = true

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
  force = true

[[headers]]
  for = "/*"
    [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
`;

fs.writeFileSync(netlifyTomlPath, netlifyTomlContent);
console.log('✅ Created netlify.toml in client build directory');

console.log('✅ Netlify deployment preparation complete'); 