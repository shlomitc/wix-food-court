import React from 'react';
import update from 'immutability-helper';
import autobind from 'autobind-decorator';

import Loader from 'wix-style-react/Loader';
import s from './App.scss';
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';
import staticData from '../../data';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStr: '',
      searchTerm: '',
      searchResults: [],
      searchInProgress: false
    };

  }
  /**
   * Creates a filtered data array, selecting only rows in which the value of
   * the property named [filedName] includes the filter string.
   * @param {*} data Array of items (objects). An object must have a property named fieldName.
   * @param {*} filterStr the filter string
   * @param {*} fieldName the property to filter on.
   */
  static getFilteredData(data, filterStr, fieldName) {
    return data.filter(row => {
      return row[fieldName].includes(filterStr);
    });
  }

  render() {
    // const searchResults = staticData.value.results;
    const searchResults = this.state.searchResults;

    const restaurantArray = searchResults.map(item => {
      return {
        title: item.title.he_IL,
        phone: item.contact.phone
      };
    });

    return (
      <div className={s.root}>
        <div className={s.header}>
          <h2>{'Food Court!'}</h2>
        </div>
        <div className={s.searchPane}>
          <SearchBar
            data={restaurantArray}
            updateFilter={this.updateFilterStr}
            fireSearch={this.fireSearch}
            />
        </div>
        <div className={s.searchResultsPane}>
          {this.state.searchInProgress ? (
            <Loader
              dataHook="search-loader"
              size="large"
              text={`Searching for [${this.state.searchTerm}]`}
              />
          ) : (
            <SearchResults
              data={App.getFilteredData(restaurantArray, this.state.filterStr, 'title')}
              />
          )}
        </div>
      </div>
    );
  }

  @autobind
  updateFilterStr(filterStr) {
    this.setState(update(this.state, {
      filterStr: {$set: filterStr}
    }));
  }

  @autobind
  fireSearch(searchTerm) {
    // TODO: add searchInProgress to state
    const self = this;
    this.setState({
      filterStr: '',
      searchTerm,
      searchResults: [],
      searchInProgress: true
    });

    fetch('https://spice-prod.appspot.com/v1.1', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        type: 'search',
        filter: {distributorId: 'food.co.il'},
        query: searchTerm
      })
    }).then(r => r.json())
      .then(r => {
        console.log('Got Response: ', r);
        self.setState(update(self.state, {
          searchInProgress: {$set: false},
          searchResults: {$set: r.value.results}
        }));
      }
      )
      .catch(e => {
        console.log(e);
        self.setState(update(self.state, {
          searchInProgress: {$set: false},
        }));
      });
  }
}

export default App;
