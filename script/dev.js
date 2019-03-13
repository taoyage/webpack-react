const path = require('path');
const shell = require('shelljs');
const fs = require('fs');

const dist = path.join(__dirname, '..', '/dist');
const images = path.join(__dirname, '..', '/src/images');

shell.exec(`npx webpack --config ${path.join(__dirname, '../build/webpack.dll.config.js')} --colors --progress`);
shell.exec(`npx webpack-dev-server --config ${path.join(__dirname, '../build/webpack.dev.config.js')} --colors --progress --open`);
