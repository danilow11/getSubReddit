import PropTypes from 'prop-types';

function RedditInput({ handleSubmit, inputValue,
  handleInputChange, buttonDisabled }) {
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
RedditInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  buttonDisabled: PropTypes.bool.isRequired
};

export default RedditInput;
