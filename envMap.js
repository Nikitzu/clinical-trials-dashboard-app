const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const folderPath = './src/environments/';
const allVariables = {};
const prefix = 'ANGULAR_';
let fileName = 'environment.development.ts';

if (process.env.ANGULAR_NODE_ENV === 'production') {
  fileName = 'environment.ts';
}

for (const [key, value] of Object.entries(process.env)) {
  if (key.includes(prefix)) {
    allVariables[key] = value;
  }
}

const envFile = `export const environment = ${JSON.stringify(allVariables)};`;

fs.writeFile(path.join(__dirname, folderPath + fileName), envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment`);
  }
});
