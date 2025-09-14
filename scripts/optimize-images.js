#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = 'public/images';
const outputDir = 'public/images-optimized';

// Configuraciones de optimización
const jpegConfig = { quality: 85, progressive: true };
const pngConfig = { quality: 85, compressionLevel: 8 };
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
    // Crear versión WebP optimizada
    const webpPath = path.join(outputDir, `${baseName}.webp`);
    await sharp(inputPath)
      .webp(webpConfig)
      .toFile(webpPath);

    // Optimizar imagen original
    if (ext === '.jpg' || ext === '.jpeg') {
      await sharp(inputPath)
        .jpeg(jpegConfig)
        .toFile(outputPath);
    } else if (ext === '.png') {
      await sharp(inputPath)
        .png(pngConfig)
        .toFile(outputPath);
    } else if (ext === '.gif') {
      // Para GIFs, solo copiamos sin optimizar para preservar animación
      await fs.copyFile(inputPath, outputPath);
      // Pero creamos una versión WebP estática como fallback
      await sharp(inputPath + '[0]') // Primera frame del GIF
        .webp(webpConfig)
        .toFile(webpPath);
    }

    const originalStats = await fs.stat(inputPath);
    const optimizedStats = await fs.stat(outputPath);
    const webpStats = await fs.stat(webpPath);

    const savings = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(1);
    const webpSavings = ((originalStats.size - webpStats.size) / originalStats.size * 100).toFixed(1);

    console.log(`✓ ${path.relative('.', inputPath)}`);
    console.log(`  Original: ${(originalStats.size / 1024).toFixed(1)}KB`);
    console.log(`  Optimized: ${(optimizedStats.size / 1024).toFixed(1)}KB (${savings}% saved)`);
    console.log(`  WebP: ${(webpStats.size / 1024).toFixed(1)}KB (${webpSavings}% saved)\n`);

  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
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