import React from 'react';
import s from './App.scss';
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';

class App extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.header}>
          <h2>{'Food Court!'}</h2>
        </div>
        <div className={s.searchPane}>
          <div className={s.searchBar}>
            <SearchBar/>
          </div>
        </div>
        <div className={s.searchResultsPane}>
          <SearchResults/>
        </div>
      </div>
    );
  }
}

export default App;
