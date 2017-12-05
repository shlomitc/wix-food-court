import React from 'react';
import update from 'immutability-helper';
import autobind from 'autobind-decorator';

import Loader from 'wix-style-react/Loader';
import s from './App.scss';
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';
import staticData from '../../data';

const STATIC_SEARCH_RESULT = staticData.value.results;
const DEFAULT_APP_STATE = {
  filterStr: '',
  searchTerm: '',
  searchResults: [],
  searchInProgress: false,
  showStaticData: false
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_APP_STATE;
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
    const searchResults = this.state.showStaticData ? STATIC_SEARCH_RESULT : this.state.searchResults;

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
            showStaticData={this.state.showStaticData}
            setShowStaticData={this.setShowStaticData}
            updateFilter={this.updateFilterStr}
            fireSearch={this.fireSearch}
            />
        </div>
        <div className={s.searchResultsPane}>
          {this.state.searchInProgress && !this.state.showStaticData ? (
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
  setShowStaticData(enabled) {
    this.setState(update(this.state, {
      showStaticData: {$set: enabled}
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
      searchInProgress: true,
      showStaticData: false
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
