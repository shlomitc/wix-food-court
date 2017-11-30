import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import App from './App';

describe('App', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('renders a title correctly', () => {
    wrapper = mount(
      <App/>, {attachTo: document.createElement('div')}
    );
    expect(wrapper.find('h2').length).to.eq(1);
  });

  it('filters data according to filter string', () => {
    const data = [
      {title: 'abc'},
      {title: 'afg'}
    ];
    expect(App.getFilteredData(data, 'rer', 'title').length).to.eq(0);
    expect(App.getFilteredData(data, 'ab', 'title').length).to.eq(1);
    expect(App.getFilteredData(data, 'a', 'title').length).to.eq(2);
  });
});
