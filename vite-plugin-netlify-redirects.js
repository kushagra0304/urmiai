import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';

export default function vitePluginNetlifyRedirects() {
  return {
    name: 'vite-plugin-netlify-redirects',
    closeBundle: {
      sequential: true,
      order: 'post',
      handler() {
        // Ensure build/client directory exists
        const clientDir = resolve(process.cwd(), 'build/client');
        if (!existsSync(clientDir)) {
          mkdirSync(clientDir, { recursive: true });
        }

        // Create _redirects file with SPA routing rule
        const redirectsContent = '/* /index.html 200';
        const redirectsPath = resolve(clientDir, '_redirects');
        writeFileSync(redirectsPath, redirectsContent);
        console.log('✅ Generated Netlify _redirects file');
      }
    }
  };
} 