'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return corgi_request().then(extract_corgis, function (err) {
    console.error('Corgi problem :(');
    return _q2.default.reject(err);
  });
};

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var REDDIT_URL = 'https://www.reddit.com/user/d0nkeh/m/corgi/.json'; // Corgi Client

var corgi_request = function corgi_request() {
  var p = _q2.default.defer();

  _request2.default.get({
    uri: REDDIT_URL,
    method: 'GET',
    json: true,
    headers: {
      'User-Agent': 'hubot:corgi:v0.2.0 (by /u/d0nkeh)'
    }
  }, function (err, res, body) {
    if (err || res.statusCode != 200) {
      p.reject(err);
    } else {
      p.resolve(body.data.children);
    }
  });
  return p.promise;
};

// Functional corgi url extraction.
var extract_corgis = function extract_corgis(corgis) {
  return (0, _lodash2.default)(corgis).map(function (corgi) {
    return corgi.data.url;
  }).filter(function (corgi) {
    return (/imgur/i.test(corgi)
    );
  }).map(function (corgi) {
    // TODO resolve imgur .link if it is not direct.
    return corgi;
  }).value();
};

var imgur_to_image = function imgur_to_image(id) {
  var p = _q2.default.defer();

  _request2.default.get({
    uri: 'https://api.imgur.com/3/image/' + id,
    method: 'GET',
    json: true,
    headers: {
      'Authorization': "Client-ID " + process.env.HUBOT_IMGUR_CLIENT_ID
    }
  }, function (err, res, body) {
    if (err || res.statusCode != 200) {
      p.reject(err);
    } else {
      p.resolve(body.data.link);
    }
  });

  return p.promise;
};

;