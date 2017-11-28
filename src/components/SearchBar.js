import React from 'react';
import PropTypes from 'prop-types';
import Search from 'wix-style-react/Search';

const SearchBar = props => {

  // ESLint forces handler to be prefixed by 'handle'
  const handleManuallyInput = inputValue => {
    props.updateFilter(inputValue);
  };

  return (
    <Search
      closeOnSelect={false}
      onManuallyInput={handleManuallyInput}
      />
  );
};

SearchBar.propTypes = {
  updateFilter: PropTypes.func.isRequired
};


export default SearchBar;
