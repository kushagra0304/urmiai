import { createRequestHandler } from '@react-router/node';
import { installGlobals } from '@remix-run/node';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

// This installs globals such as "fetch", "Response", "Request" and "Headers".
installGlobals();

// Get the directory name
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const BUILD_DIR = path.join(__dirname, '../build/server');

// Handler function for Vercel
export default async function handler(req, res) {
  try {
    // Dynamically import the server build
    let buildModule;
    try {
      const buildPath = path.join(BUILD_DIR, 'index.js');
      if (fs.existsSync(buildPath)) {
        buildModule = await import(buildPath);
      } else {
        throw new Error(`Build file not found at: ${buildPath}`);
      }
    } catch (importError) {
      console.error("Error importing build module:", importError);
      return res.status(500).send(`Server Error: Unable to load server build. ${importError.message}`);
    }

    const serverBuild = buildModule?.default;
    if (!serverBuild) {
      return res.status(500).send("Server Error: Server build not found");
    }

    // Create the request handler
    const handleRequest = createRequestHandler({
      build: serverBuild,
      mode: process.env.NODE_ENV,
      getLoadContext: () => ({}),
    });

    // Handle the request
    return handleRequest(req, res);
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).send(`Server Error: ${error.message}`);
  }
} 