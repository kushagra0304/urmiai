const fs = require('fs');
const path = require('path');

// Ensure build directory exists
const buildDir = path.join(__dirname, 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
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
}

console.log('✅ Netlify deployment preparation complete'); 