var chai = require('chai'),
  expect = chai.expect;

var corggit = require('../lib/corggit');

describe('corggit', () => {
  it('fetches a corg post object', (cb) => {
    corggit().then(post => {
      expect(post).to.be.a('object');
      expect(post).to.have.property('url');
      expect(post).to.have.property('domain');
      expect(post).to.have.property('title');
      cb();
    });
  });
});
