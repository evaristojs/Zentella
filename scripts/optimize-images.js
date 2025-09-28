#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.resolve(__dirname, '../src/assets/originals/images-original');
const outputDir = path.resolve(__dirname, '../public/images');

// Configuraciones de optimización
const webpConfig = { quality: 80, effort: 4 };

async function ensureDir(dirPath) {
  try {
    await fs.access(dirPath);
  } catch {
    await fs.mkdir(dirPath, { recursive: true });
  }
}

async function optimizeImage(inputPath, outputPath) {
  const ext = path.extname(inputPath).toLowerCase();
  const baseName = path.basename(inputPath, ext);
  const outputDir = path.dirname(outputPath);

  await ensureDir(outputDir);

  try {
    const originalStats = await fs.stat(inputPath);
    let webpStats;
    let optimizedOriginalStats;

    const webpPath = path.join(outputDir, `${baseName}.webp`);

    if (ext === '.gif') {
      // Copiar GIF original para preservar la animación
      await fs.copyFile(inputPath, outputPath);
      optimizedOriginalStats = await fs.stat(outputPath);

      // Crear una versión WebP estática a partir del primer fotograma como fallback
      await sharp(inputPath + '[0]')
        .webp(webpConfig)
        .toFile(webpPath);
      webpStats = await fs.stat(webpPath);
    } else {
      // Para JPG, JPEG, PNG, solo crear la versión WebP
      await sharp(inputPath)
        .webp(webpConfig)
        .toFile(webpPath);
      webpStats = await fs.stat(webpPath);
    }

    console.log(`✓ ${path.relative('.', inputPath)}`);
    console.log(`  Original: ${(originalStats.size / 1024).toFixed(1)}KB`);

    if (optimizedOriginalStats) { // Si se guardó un formato original optimizado (es decir, GIF)
      const savings = ((originalStats.size - optimizedOriginalStats.size) / originalStats.size * 100).toFixed(1);
      console.log(`  Original Optimizado: ${(optimizedOriginalStats.size / 1024).toFixed(1)}KB (${savings}% saved)`);
    }

    if (webpStats) {
      const webpSavings = ((originalStats.size - webpStats.size) / originalStats.size * 100).toFixed(1);
      console.log(`  WebP: ${(webpStats.size / 1024).toFixed(1)}KB (${webpSavings}% saved)
`);
    } else {
      console.log(`  WebP: No generado.
`);
    }

  } catch (error) {
    console.error(`❌ Error procesando ${inputPath}:`, error.message);
  }
}

async function processDirectory(inputDir, outputDir) {
  const items = await fs.readdir(inputDir);

  for (const item of items) {
    const inputPath = path.join(inputDir, item);
    const outputPath = path.join(outputDir, item);
    const stats = await fs.stat(inputPath);

    if (stats.isDirectory()) {
      await processDirectory(inputPath, outputPath);
    } else if (/\.(jpg|jpeg|png|gif)$/i.test(item)) {
      await optimizeImage(inputPath, outputPath);
    } else {
      // Copiar otros archivos tal como están
      await ensureDir(path.dirname(outputPath));
      await fs.copyFile(inputPath, outputPath);
    }
  }
}

async function main() {
  console.log('🖼️  Optimizando imágenes...\n');

  try {
    await processDirectory(inputDir, outputDir);

    // Calcular estadísticas totales
    const getDirectorySize = async (dir) => {
      let size = 0;
      const files = await fs.readdir(dir, { withFileTypes: true });

      for (const file of files) {
        const filePath = path.join(dir, file.name);
        if (file.isDirectory()) {
          size += await getDirectorySize(filePath);
        } else {
          const stats = await fs.stat(filePath);
          size += stats.size;
        }
      }
      return size;
    };

    const originalSize = await getDirectorySize(inputDir);
    const optimizedSize = await getDirectorySize(outputDir);
    const totalSavings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);

    console.log('📊 Resumen de optimización:');
    console.log(`   Tamaño original: ${(originalSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`   Tamaño optimizado: ${(optimizedSize / 1024 / 1024).toFixed(1)}MB`);
    console.log(`   Ahorro total: ${totalSavings}%`);
    console.log('\n✅ Optimización completada!');

  } catch (error) {
    console.error('❌ Error durante la optimización:', error);
    process.exit(1);
  }
}

main();
