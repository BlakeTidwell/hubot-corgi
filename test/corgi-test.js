var
  Helper = require('hubot-test-helper'),
  chai = require('chai'),
  expect = chai.expect,
  sinon = require('sinon'),
  corggit = require('../lib/corggit');

let helper = new Helper('../src/corgi.js')

var promiseDelay = function(length) {
  length = length || 1000;
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), length);
  });
};


describe('corgi', () => {
  beforeEach(() => {
    this.room = helper.createRoom();
  });

  afterEach(() => {
    this.room.destroy();
  });

  it('responds to corgi');

});
