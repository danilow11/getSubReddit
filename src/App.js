import React, { useState } from 'react';
import Subreddit from './Subreddit';
import RedditInput from './RedditInput';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('pokemon');
  const [subreddit, setSubreddit] = useState(inputValue);
  const [buttonDisabled, setButtonDis] = useState(false);

  const handleInputChange = newValue => {
    setInputValue(newValue);
    setButtonDis(!newValue ? true : false);
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (inputValue) {
      setSubreddit(inputValue);
    }
  };

  return (
    <main className="App">
      <RedditInput
        handleSubmit={handleSubmit}
        inputValue={inputValue}
        handleInputChange={handleInputChange}
        buttonDisabled={buttonDisabled}
      />
      <Subreddit getThis={subreddit} />
    </main>
  );
}

export default App;
