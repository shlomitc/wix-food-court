import React from 'react';
import PropTypes from 'prop-types';
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

  return (
    <div>
      <Label for="search">
        Filter by Name
      </Label>

      <Search
        id="search"
        closeOnSelect={false}
        onManuallyInput={handleManuallyInput}
        options={options}
        placeholder="Filter"
        />

    </div>
  );
};

SearchBar.propTypes = {
  data: PropTypes.array.isRequired,
  updateFilter: PropTypes.func.isRequired
};


export default SearchBar;
