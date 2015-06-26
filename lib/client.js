var REDDIT_URL, _, corgi_request, extract_corgis, q, request;

request = require('request');

q = require('q');

_ = require('lodash');

REDDIT_URL = 'https://www.reddit.com/user/d0nkeh/m/corgi/.json';

corgi_request = function() {
  var p;
  p = q.defer();
  request.get({
    uri: REDDIT_URL,
    method: 'GET',
    json: true,
    headers: {
      'User-Agent': 'hubot:corgi:v0.1.0 (by /u/d0nkeh)'
    }
  }, function(err, res, body) {
    if (err || res.statusCode !== 200) {
      return p.reject(err);
    } else {
      return p.resolve(body.data.children);
    }
  });
  return p.promise;
};

extract_corgis = function(corgis) {
  return _(corgis).map(function(corgi) {
    return corgi.data.url;
  }).filter(function(corgi) {
    return /imgur/i.test(corgi);
  }).value();
};

module.exports = function() {
  return corgi_request().then(extract_corgis, function(err) {
    console.error('Corgi problem :(');
    return q.reject(err);
  });
};
