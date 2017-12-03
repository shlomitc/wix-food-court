import React from 'react';
import {expect} from 'chai';
import {mount} from 'enzyme';
import SearchBar from './SearchBar';
import Search from 'wix-style-react/Search';

describe('SearchBar', () => {
  let wrapper;

  afterEach(() => wrapper.detach());

  it('renders a Search input', () => {
    wrapper = mount(
      <SearchBar
        data={[]}
        updateFilter={() => {}}
        />,
       {attachTo: document.createElement('div')}
    );
    expect(wrapper.find(Search).length).to.eq(1);
  });

});
