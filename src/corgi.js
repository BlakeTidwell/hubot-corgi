var corggit = require('../lib/corggit');

module.exports = (robot) => {
  robot.respond(/corgi/, (res) => {
    return corggit().then(post => res.send(post.url));
  });
};
