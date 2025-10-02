const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'public', 'images', 'services', 'animation-preview-optimized.webp');
const outputPath = path.join(__dirname, '..', 'public', 'images', 'services', 'animation-preview-optimized-new.webp');
const backupPath = path.join(__dirname, '..', 'public', 'images', 'services', 'animation-preview-optimized-backup.webp');

async function optimizeImage() {
  try {
    console.log('Analizando imagen original...');
    const metadata = await sharp(inputPath).metadata();
    console.log('Dimensiones originales: ' + metadata.width + 'x' + metadata.height);
    console.log('Formato: ' + metadata.format);
    console.log('Paginas/Frames: ' + (metadata.pages || 1));

    console.log('\nCreando backup...');
    fs.copyFileSync(inputPath, backupPath);
    console.log('Backup creado');

    console.log('\nOptimizando imagen...');
    await sharp(inputPath, { animated: true })
      .webp({
        quality: 75,
        effort: 6,
        lossless: false,
        alphaQuality: 80,
        nearLossless: false,
        smartSubsample: true
      })
      .toFile(outputPath);

    const originalStats = fs.statSync(inputPath);
    const optimizedStats = fs.statSync(outputPath);

    const originalSize = (originalStats.size / 1024 / 1024).toFixed(2);
    const optimizedSize = (optimizedStats.size / 1024 / 1024).toFixed(2);
    const reduction = ((1 - optimizedStats.size / originalStats.size) * 100).toFixed(1);

    console.log('\n--- Resultados de Optimizacion ---');
    console.log('Tamano original: ' + originalSize + 'MB');
    console.log('Tamano optimizado: ' + optimizedSize + 'MB');
    console.log('Reduccion: ' + reduction + '%');

    if (optimizedStats.size < originalStats.size) {
      console.log('\nReemplazando imagen original con version optimizada...');
      fs.copyFileSync(outputPath, inputPath);
      fs.unlinkSync(outputPath);
      console.log('Optimizacion completada exitosamente');
      console.log('\nBackup guardado en: ' + backupPath);
    } else {
      console.log('\nLa version optimizada no es mas pequena. No se reemplazo el original.');
      fs.unlinkSync(outputPath);
    }

  } catch (error) {
    console.error('Error durante la optimizacion:', error);
    process.exit(1);
  }
}

optimizeImage();
