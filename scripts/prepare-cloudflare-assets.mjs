import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';

const root = process.cwd();
const source = join(root, '.assetsignore');
const target = join(root, '.open-next/assets/.assetsignore');

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);

console.log('Copied .assetsignore into .open-next/assets');
