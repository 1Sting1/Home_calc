// Simple script to start the application from the correct directory
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Change directory to AttachmentManager
const cwd = path.join(process.cwd(), 'AttachmentManager');

console.log('Starting application from:', cwd);

// Execute npm run dev inside AttachmentManager directory
const child = exec('npm run dev', { cwd });

// Forward stdout and stderr to the console
child.stdout.pipe(process.stdout);
child.stderr.pipe(process.stderr);

// Handle process exit
child.on('exit', (code) => {
  process.exit(code);
});

// Handle process errors
child.on('error', (err) => {
  console.error('Error executing command:', err);
  process.exit(1);
});