var package = require('../package.json');

const DEFAULT_MULTIREDDIT = 'https://reddit.com/u/d0nkeh/m/corgi.json';

module.exports = {
  multiUrl: process.env.HUBOT_CORGI_MULTIREDDIT_URL || process.env.MULTIREDDIT_URL || DEFAULT_MULTIREDDIT,
  version: package.version
};
