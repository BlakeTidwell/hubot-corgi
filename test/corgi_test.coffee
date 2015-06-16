require './test_helper'

corgi =
  corgilishious: true
  stubby_legs: true
  tail: 'short'

describe 'a typical corgi', ->
  it 'is corgilishious', ->
    expect(corgi.corgilishious).to.be.equal(true)
  it 'has stubby legs', ->
    expect(corgi.stubby_legs).to.be.equal(true)
  it 'has a short tail', ->
    expect(corgi.tail).to.be.equal('short')