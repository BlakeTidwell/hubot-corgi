// Corgi Client
import request from 'request';
import q from 'q';
import _ from 'lodash';


const REDDIT_URL = 'https://www.reddit.com/user/d0nkeh/m/corgi/.json'

let corgi_request = () => {
  let p = q.defer();

  request.get({ 
    uri: REDDIT_URL,
    method: 'GET',
    json: true, 
    headers: {
      'User-Agent': 'hubot:corgi:v0.2.0 (by /u/d0nkeh)'
    }
  }, (err, res, body) => {
    if (err || res.statusCode != 200) {
        p.reject(err);
    } else {
        p.resolve(body.data.children);
    }
  });
  return p.promise;
};

// Functional corgi url extraction.
let extract_corgis = (corgis) => {
  return _(corgis).map((corgi) => {
    return corgi.data.url;
  }).filter((corgi) => {
    return /imgur/i.test(corgi)
  }).map((corgi) => {
    // TODO resolve imgur .link if it is not direct.
    return corgi;
  }).value();
};

let imgur_to_image = (id) => {
  let p = q.defer();

  request.get({
    uri: 'https://api.imgur.com/3/image/' + id,
    method: 'GET',
    json: true,
    headers: {
      'Authorization': "Client-ID " + process.env.HUBOT_IMGUR_CLIENT_ID
    }
  }, (err, res, body) => {
    if (err || res.statusCode != 200) { 
        p.reject(err);
    } else {
        p.resolve(body.data.link);
    }
  });

  return p.promise;
};

export default function () {
  return corgi_request().then(extract_corgis, (err) => {
    console.error('Corgi problem :(');
    return q.reject(err);
  });
};
