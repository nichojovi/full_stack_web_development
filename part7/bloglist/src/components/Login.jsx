import PropTypes from "prop-types";

const InputField = ({ label, type, value, onChange, id }) => (
  <div>
    {label}
    <input type={type} value={value} onChange={onChange} id={id} />
  </div>
);

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={handleSubmit}>
      <InputField
        label="username"
        type="text"
        value={username}
        onChange={handleUsernameChange}
        id="username"
      />
      <InputField
        label="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        id="password"
      />
      <button type="submit" id="login">
        login
      </button>
    </form>
  </div>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
