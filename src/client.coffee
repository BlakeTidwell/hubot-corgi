# Corgi Client

request = require 'request'
q       = require 'q'
_       = require 'lodash'

REDDIT_URL = 'https://www.reddit.com/user/d0nkeh/m/corgi/.json'


corgi_request = ->
  p = q.defer()

  request.get 
    uri: REDDIT_URL,
    method: 'GET',
    json: true, 
    headers:
      'User-Agent': 'hubot:corgi:v0.1.0 (by /u/d0nkeh)'
    (err, res, body) ->
      if err || res.statusCode != 200
        p.reject err
      else
        p.resolve body.data.children
  p.promise

# Functional corgi url extraction.
extract_corgis = (corgis) ->
  _(corgis).map (corgi) ->
    corgi.data
  .filter (corgi) ->
    /imgur/i.test corgi.url
  .pluck 'url'
  .value()

module.exports = ->
  corgi_request().then extract_corgis, (err) ->
    console.error 'Corgi problem :('
    q.reject err