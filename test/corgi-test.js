var
  Helper = require('hubot-test-helper'),
  chai = require('chai'),
  expect = chai.expect;

helper = new Helper('../src/corgi.js')

describe('corgi', () => {
  beforeEach(() => {
    this.room = helper.createRoom();
  });

  afterEach(() => {
    this.room.destroy();
  });

  it('responds to hello', () => {
    this.room.user.say('alice', '@hubot hello').then(() => {
      expect(this.room.messages).to.eql([
        ['alice', '@hubot hello'],
        ['hubot', '@alice hello!'],
      ]);
    });
  });

  it('hears orly', () => {
    this.room.user.say('bob', 'just wanted to say orly').then(() => {
      expect(this.room.messages).to.eql([
        ['bob', 'just wanted to say orly'],
        ['hubot', 'yarly']
      ]);
    });
  });
});
