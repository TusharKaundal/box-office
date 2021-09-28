/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react';
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout';
import ShowGrid from '../components/show/ShowGrid';
import { apiGet } from '../misc/config';
import { useLastQuery } from '../misc/custom-hooks';
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from './Home.styled';

const renderResult = result => {
  if (result && result.length === 0) {
    return <div>No results</div>;
  }
  if (result && result.length > 0) {
    return result[0].show ? (
      <ShowGrid data={result} />
    ) : (
      <ActorGrid data={result} />
    );
  }
  return null;
};

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [result, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState('shows');

  const isShowSearch = searchOption === 'shows';
  const onInputChange = useCallback(
    ev => {
      setInput(ev.target.value);
    },
    [setInput]
  );
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(results => {
      setResult(results);
    });
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      onSearch();
    }
  };

  const onRadioChange = useCallback(ev => {
    setSearchOption(ev.target.value);
  }, []);

  return (
    <MainPageLayout>
      <label htmlFor="label" />
      <SearchInput
        id="label"
        type="text"
        onKeyDown={onKeyDown}
        onChange={onInputChange}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            id="shows-search"
            label="Shows"
            value="shows"
            checked={isShowSearch}
            onChange={onRadioChange}
          />
        </div>
        <div>
          <CustomRadio
            label="Actors"
            id="actors-search"
            value="people"
            checked={!isShowSearch}
            onChange={onRadioChange}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResult(result)}
    </MainPageLayout>
  );
};

export default Home;
