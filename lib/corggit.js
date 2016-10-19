var rp = require('request-promise-native');
const Config = require('./config');

function listPosts(uri) {
  return rp({
    uri: uri,
    json: true,
    headers: {
      'User-Agent': `hubot/corgi v${Config.version} (by /u/d0nkeh)`
    }
  }).then((data) => {
    if (data.kind == 'Listing') {
      return data.data.children;
    } else {
      return Promise.reject(data);
    }
  }, (err) => {
    return Promise.reject(err);
  });
}

function filter(children) {
  return children.map(child => child.data)
    .filter(post => {
      return !post.is_self
        && !post.over_18 // sfw only please
        && /imgur\.com|reddituploads\.com|gyfycat\.com/i.test(post.domain);
    });
}

function corggit() {
  return listPosts(Config.multiUrl)
    .then(posts => filter(posts))
    .then(posts => {
      let index = Math.floor(Math.random() * posts.length);
      return posts[index];
    });
}

// expose for testing and reuse
// TODO: refactor
corggit.filter = filter;
corggit.listPosts = listPosts;

module.exports = corggit;
