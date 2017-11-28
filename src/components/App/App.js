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
          <div className={s.searchBar}>
            <SearchBar
              data={data}
              updateFilter={this.updateFilterStr}
              />
          </div>
        </div>
        <div className={s.searchResultsPane}>
          <SearchResults
            data={data}
            filterStr={this.state.filterStr}
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
