var corggit = require('../lib/corggit');

module.exports = (robot) => {
  robot.respond(/corgi/, res => {
    return corggit().then(post => res.send(post.url)).catch(e => {
      res.send({
        text: 'Error: Couldn\'t corgi :(',
        attachments: [
          {
            "text": e,
            "color": "#FF0000"
          }
        ]
      });
    });
  });
};
