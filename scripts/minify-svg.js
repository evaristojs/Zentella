import { promises as fs } from 'fs';
import path from 'path';
import { optimize } from 'svgo';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../public'); // Search in public directory

async function minifySvgFile(filePath) {
  try {
    const svgContent = await fs.readFile(filePath, 'utf8');
    const result = optimize(svgContent, {
      path: filePath, // Pass original path for better error reporting
      // Add any specific SVGO plugins or configurations here
      // For example, to remove comments and metadata:
      // plugins: [
      //   { name: 'removeComments' },
      //   { name: 'removeMetadata' },
      // ]
    });

    if (result.error) {
      console.error(`❌ Error optimizing ${filePath}: ${result.error}`);
      return;
    }

    await fs.writeFile(filePath, result.data, 'utf8');
    console.log(`✓ Minified: ${path.relative('.', filePath)}`);
  } catch (error) {
    console.error(`❌ Failed to minify ${filePath}:`, error);
  }
}

async function processDirectory(directory) {
  const items = await fs.readdir(directory, { withFileTypes: true });

  for (const item of items) {
    const itemPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      // Exclude node_modules and .git directories
      if (item.name === 'node_modules' || item.name === '.git') {
        continue;
      }
      await processDirectory(itemPath);
    } else if (item.isFile() && item.name.endsWith('.svg')) {
      await minifySvgFile(itemPath);
    }
  }
}

async function main() {
  console.log('✨ Minifying SVG files...\n');
  try {
    await processDirectory(inputDir);
    console.log('\n✅ SVG minification completed!');
  } catch (error) {
    console.error('❌ Error during SVG minification:', error);
    process.exit(1);
  }
}

main();