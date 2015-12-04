// Corgi client tests
import './test_helper';
import client from '../lib/client';
import _ from 'lodash';

describe('Corgi Client', () => {
  it('gets an array of corgi image urls', (done) => {
    client().then((corgis) => {
      expect(corgis).to.be.an('Array');
      done();
    });
  });
});

