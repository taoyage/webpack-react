const path = require('path');
const shell = require('shelljs');

shell.exec(`npx webpack --config ${path.join(__dirname, '../build/webpack.dll.config.js')} --colors --progress`);
shell.exec(`npx webpack-dev-server --config ${path.join(__dirname, '../build/webpack.dev.config.js')} --colors --progress --open`);
