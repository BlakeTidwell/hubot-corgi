// Corgi Client
import request from 'request';
import _ from 'lodash';
import app from '../package';
import process from 'process';

const REDDIT_URL = 'https://www.reddit.com/user/d0nkeh/m/corgi/.json';

function corgiRequest() {
  return new Promise((resolve, reject) => {
    request.get({ 
      uri: REDDIT_URL,
      method: 'GET',
      json: true, 
      headers: {
        'User-Agent': `hubot:corgi:${app.version} (by /u/d0nkeh)`
      }
    }, (err, res, body) => {
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
  return _(corgis).map((corgi) => {
    return corgi.data.url;
  }).filter((corgi) => {
    return /imgur/i.test(corgi);
  }).map((corgi) => {
    // TODO resolve imgur .link if it is not direct.
    if (!corgi.match(/i\.imgur\.com|\.(?:jpg|png)$/i)) {
      let id = corgi.substring(corgi.lastIndexOf('/')+1);
      return imgurToImageLink(id);
    } else {
      return corgi;
    }
  }).value();
}

function imgurToImageLink(id) {
  return new Promise((resolve, reject) => {
    request.get({
      uri: 'https://api.imgur.com/3/image/' + id,
      json: true,
      headers: {
        'Authorization': 'Client-ID ' + process.env.HUBOT_IMGUR_CLIENT_ID
      }
    }, (err, res, body) => {
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

export {imgurToImageLink, corgiRequest, corgiFn as default};

