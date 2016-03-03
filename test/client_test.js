// Corgi client tests
import './test_helper';
import {default as client, imgurToImageLink} from '../src/client';

import _ from 'lodash';
describe('Corgi Client', () => {
  it('gets an array of corgi image urls', (done) => {
    client().then((corgis) => {
      expect(corgis).to.be.an('Array');
      done();
    });
  });

  it('can convert an imgur url into an image link', (done) => {
    imgurToImageLink('Hf0ufnQ').then((link) => {
        expect(link).to.match(/^https?:\/\/i\.imgur\.com\/.+\.jpg$/i);
        done();
    });  
  });
});

