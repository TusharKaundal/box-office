import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';
import { apiGet } from '../misc/config';

const Home = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const onInputChange = ev => {
    setInput(ev.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(results => {
      setResult(results);
    });
  };

  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const renderResult = () => {
    if (result && result.length === 0) {
      return <div>No results</div>;
    }
    if (result && result.length > 0) {
      return (
        <div>
          {result.map(item => {
            return <div key={item.show.id}>{item.show.name}</div>;
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        onKeyDown={onKeyDown}
        onChange={onInputChange}
        value={input}
      />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
