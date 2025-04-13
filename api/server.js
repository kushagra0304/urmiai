import { createRequestHandler } from '@react-router/node';
import { installGlobals } from '@remix-run/node';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'node:url';

// This installs globals such as "fetch", "Response", "Request" and "Headers".
installGlobals();

// This needs to be a CommonJS module, but let's try to migrate it to ESM
// when possible.
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const BUILD_DIR = path.join(__dirname, '../build/server');

const buildPath = path.resolve(__dirname, '../build/server/index.js');
const buildModule = buildPath ? await import(buildPath) : undefined;
const serverBuild = buildModule?.default;

function getLoadContext(req, res) {
  return {};
}

// This is the live server that uses the built app.
export default createRequestHandler({
  build: serverBuild,
  mode: process.env.NODE_ENV,
  getLoadContext,
}); 