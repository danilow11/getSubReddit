import React from 'react';

function RedditInput({ handleSubmit, inputValue, handleInputChange, buttonDisabled }) {
  return (
    <form onSubmit={handleSubmit} className="reddit-form">
      <input
        value={inputValue}
        onChange={e => handleInputChange(e.target.value)}
        required
      />
      <button disabled={buttonDisabled}>Get!</button>
    </form>
  );
}

export default RedditInput;
