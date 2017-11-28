import React from 'react';
import PropTypes from 'prop-types';
import Search from 'wix-style-react/Search';

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

  return (
    <Search
      closeOnSelect={false}
      onManuallyInput={handleManuallyInput}
      options={options}
      />
  );
};

SearchBar.propTypes = {
  data: PropTypes.array.isRequired,
  updateFilter: PropTypes.func.isRequired
};


export default SearchBar;
