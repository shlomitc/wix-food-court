import React from 'react';
import s from './App.scss';
import SearchBar from '../SearchBar';
import SearchResults from '../SearchResults';

function App() {
  return (
    <div className={s.root}>
      <div className={s.header}>
        <h2>{'Food Court!'}</h2>
      </div>
      <SearchBar/>
      <SearchResults/>
    </div>
  );
}

export default App;
