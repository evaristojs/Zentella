const terser = require('terser');
const fs = require('fs');
const path = require('path');

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

        terser.minify(data).then(minified => {
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
