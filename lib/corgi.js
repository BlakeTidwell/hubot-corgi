var client;

client = require('./client');

module.exports = function(robot) {
  robot.respond(/corgi gif/, function(msg) {
    return msg.send('Corgi gifs coming soon, for now just use the regular command "corgi [me]"');
  });
  return robot.respond(/corgi(?: me)?$/, function(msg) {
    return client().then(function(corgis) {
      return msg.send(msg.random(corgis));
    });
  });
};
