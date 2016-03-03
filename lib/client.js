'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.corgiRequest = exports.imgurToImageLink = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _process = require('process');

var _process2 = _interopRequireDefault(_process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Corgi Client


var REDDIT_URL = 'https://www.reddit.com/user/d0nkeh/m/corgi/.json';

function corgiRequest() {
  return new Promise(function (resolve, reject) {
    _request2.default.get({
      uri: REDDIT_URL,
      method: 'GET',
      json: true,
      headers: {
        'User-Agent': 'hubot:corgi:' + _package2.default.version + ' (by /u/d0nkeh)'
      }
    }, function (err, res, body) {
      if (err || res.statusCode != 200) {
        reject(err);
      } else {
        resolve(body.data.children);
      }
    });
  });
}

// Functional corgi url extraction.
function extractCorgis(corgis) {
  return (0, _lodash2.default)(corgis).map(function (corgi) {
    return corgi.data.url;
  }).filter(function (corgi) {
    return (/imgur/i.test(corgi)
    );
  }).map(function (corgi) {
    // TODO resolve imgur .link if it is not direct.
    if (!corgi.match(/i\.imgur\.com|\.(?:jpg|png)$/i)) {
      var id = corgi.substring(corgi.lastIndexOf('/') + 1);
      return imgurToImageLink(id);
    } else {
      return corgi;
    }
  }).value();
}

function imgurToImageLink(id) {
  return new Promise(function (resolve, reject) {
    _request2.default.get({
      uri: 'https://api.imgur.com/3/image/' + id,
      json: true,
      headers: {
        'Authorization': 'Client-ID ' + _process2.default.env.HUBOT_IMGUR_CLIENT_ID
      }
    }, function (err, res, body) {
      if (err || res.statusCode != 200) {
        reject(err, res);
      } else {
        resolve(body.data.link);
      }
    });
  });
}

function corgiFn() {
  return corgiRequest().then(extractCorgis);
}

exports.imgurToImageLink = imgurToImageLink;
exports.corgiRequest = corgiRequest;
exports.default = corgiFn;