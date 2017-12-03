import React from 'react';
import s from './App.scss';
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';
import staticData from '../../data';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterStr: ''
    };
    //TODO: use autobind decorator
    this.updateFilterStr = this.updateFilterStr.bind(this);
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
    const data = staticData.value.results.map(item => {
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
            data={data}
            updateFilter={this.updateFilterStr}
            />
        </div>
        <div className={s.searchResultsPane}>
          <SearchResults
            data={App.getFilteredData(data, this.state.filterStr, 'title')}
            />
        </div>
      </div>
    );
  }

  updateFilterStr(filterStr) {
    this.setState({
      filterStr
    });
  }
}

export default App;
