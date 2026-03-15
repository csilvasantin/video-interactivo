const { spawn } = require('child_process');
const child = spawn(process.execPath, [
  'C:/Users/csilv/aENA/video-interactivo/node_modules/vite/bin/vite.js',
  '--port', '5173'
], {
  cwd: 'C:/Users/csilv/aENA/video-interactivo',
  stdio: 'inherit'
});
process.on('SIGTERM', () => child.kill());
process.on('SIGINT', () => child.kill());
child.on('exit', (code) => process.exit(code || 0));
