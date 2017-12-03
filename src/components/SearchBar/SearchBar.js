import React from 'react';
import PropTypes from 'prop-types';
import s from './SearchBar.scss';
import Search from 'wix-style-react/Search';
import Label from 'wix-style-react/Label';

const SearchBar = props => {

  // ESLint forces handler to be prefixed by 'handle'
  const handleManuallyInput = inputValue => {
    props.updateFilter(inputValue);
  };
  const options = props.data.map((item, index) => {
    return {
      id: index,
      value: item.title
    };
  });

  //TODO: put Label beside the input, not above it.
  return (
    <div className={s.searchBar}>
      <Search
        id="search"
        closeOnSelect={false}
        onManuallyInput={handleManuallyInput}
        options={options}
        placeholder="Filter By Name"
        />
    </div>
  );
};

SearchBar.propTypes = {
  data: PropTypes.array.isRequired,
  updateFilter: PropTypes.func.isRequired
};


export default SearchBar;
