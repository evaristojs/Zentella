import { minify } from 'terser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');

fs.readdir(publicDir, (err, files) => {
  if (err) {
    console.error('Could not list the directory.', err);
    process.exit(1);
  }

  files.forEach((file) => {
    if (path.extname(file) === '.js') {
      const filePath = path.join(publicDir, file);
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Could not read file ${filePath}.`, err);
          return;
        }

        minify(data).then(minified => {
          if (minified.error) {
            console.error(`Terser error on file ${filePath}:`, minified.error);
            return;
          }
          fs.writeFile(filePath, minified.code, (err) => {
            if (err) {
              console.error(`Could not write minified file ${filePath}.`, err);
            } else {
              console.log(`Successfully minified ${file}`);
            }
          });
        }).catch(error => {
            console.error(`Terser failed on file ${filePath}:`, error);
        });
      });
    }
  });
});
