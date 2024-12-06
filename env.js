const fs = require('fs');
const dotenv = require('dotenv');
const env = dotenv.config().parsed;

const scriptContent = `window.env = ${JSON.stringify(env)};`;
fs.writeFileSync('./env.js', scriptContent);
