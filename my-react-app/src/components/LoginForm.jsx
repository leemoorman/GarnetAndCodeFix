import { useState } from 'react';
import '../css/LoginForm.css';

const LoginForm = ({ formType, onSubmit }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    onSubmit(username, password);
  };

  return (
    <div className="login-container">
      <h1>Welcome!</h1>

      <form className="login-form" onSubmit={(e) => e.preventDefault}>
        <label>Username:</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleClick} className="login-button">
          Login
        </button>

        <div className="options">
          <label>
            <input type="checkbox" /> Remember
          </label>
          <span className="forgot-password">Forgot Password?</span>
        </div>

        {formType === 'login' && (
          <p className="signup-link">
            No Account? <strong>Sign Up Here</strong>
          </p>
        )}
      </form>
    </div>
  );
}
      
export default LoginForm;