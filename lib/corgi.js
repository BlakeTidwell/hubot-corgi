'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (robot) {
  robot.respond(/corgi gif/, function (msg) {
    msg.send('Corgi gifs coming soon, for now just use the regular command "corgi [me]"');
  });

  robot.respond(/corgi(?: me)?$/, function (msg) {
    (0, _client2.default)().then(function (corgis) {
      msg.send(msg.random(corgis));
    });
  });
};

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Corgi plugin for hubot.  Animate wasn't doing a good enough job at finding
// corgi pics and gifs.

;