const path = require('path');
const shell = require('shelljs');
const fs = require('fs');

const dist = path.join(__dirname, '..', '/dist');
const images = path.join(__dirname, '..', '/src/images');
const src = path.join(__dirname, '../src');
const public = path.join(__dirname,'../public')

shell.cp('-Rf', `${public}/icons/favicon.ico`, dist);

shell.exec(`npx webpack --config ${path.join(__dirname, '../build/webpack.dll.config.js')} --colors --progress`);
shell.exec(`npx webpack-dev-server --config ${path.join(__dirname, '../build/webpack.dev.config.js')} --colors --progress --open`);
