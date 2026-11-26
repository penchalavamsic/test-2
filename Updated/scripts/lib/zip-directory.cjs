// Use the already installed archive library; no PowerShell module is required.
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const [sourceArg, destinationArg] = process.argv.slice(2);
if (!sourceArg || !destinationArg) throw new Error('Source directory and destination ZIP are required');
const source = path.resolve(sourceArg);
const destination = path.resolve(destinationArg);
if (!fs.statSync(source).isDirectory()) throw new Error('ZIP source must be a directory');
if (destination.startsWith(source + path.sep)) throw new Error('ZIP destination must be outside its source');
const output = fs.createWriteStream(destination);
const archive = archiver('zip', { zlib: { level: 6 } });
function fail(error) { console.error(error.message); process.exitCode = 1; archive.abort(); output.destroy(); }
output.on('error', fail);
archive.on('error', fail);
archive.on('warning', fail);
archive.pipe(output);
archive.directory(source, false);
archive.finalize().catch(fail);
