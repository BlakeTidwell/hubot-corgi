# Corgi client tests
require './test_helper'

client = require '../lib/client'
_ = require 'lodash'

describe 'Corgi Client', ->
  it 'gets an array of corgi image urls', (done) ->
    client().then (corgis) ->
      expect(corgis).to.be.an('Array')
      done()
