import PropTypes from 'prop-types';

const ErrorMessage = ({ text }) =>
  <div className="error">{text}</div>;

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired
};

export default ErrorMessage;
