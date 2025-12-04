import { useState } from 'react';
import '../css/LoginSignUpForm.css';

const LoginSignUpForm = ({ formType, onSubmit }) => {
  return (
    <div className="login-container">
      <h1>Welcome!</h1>
      <form className="login-form">
        <label>Username:</label>
        <input
          type="text"
          placeholder="Username"
        />
        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
        />
        <button type="button" onClick={onSubmit} className="login-button">
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
      
export default LoginSignUpForm;