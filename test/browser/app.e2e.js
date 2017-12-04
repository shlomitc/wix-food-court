import {expect} from 'chai';
import 'babel-polyfill';
import {beforeAndAfter} from '../environment';

describe('React application', () => {
  beforeAndAfter();

  describe('open page', () => {
    it('should display title', async () => {
      await browser.get('/');
      expect(await $('h2').getText()).to.eql('Food Court!');
    });
  });

  describe('filter static results', () => {
    it('should show all data when filter string is empty', async () => {
      // await browser.get('/');
    });
    it('should filtered results', async () => {
      // await browser.get('/');
    });

  });
});
