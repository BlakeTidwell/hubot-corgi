# Corgi plugin for hubot.  Animate wasn't doing a good enough job at finding 
# corgi pics and gifs.

module.exports = (robot) ->
  robot.respond /corgi(?: me)?$/, (msg) ->
    msg.send 'corgi for youuuuu'
