import { useState } from 'react';
import '../css/LoginSignUpForm.css';

const LoginSignUpForm = ({ formType, onSubmit }) => {
  return (
    <form>
      <input type="text" placeholder={formType === "login" ? "Email" : "Username"} />
      <input type="password" placeholder="Password" />
      <button type="button" onClick={onSubmit}>
        {formType === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default LoginSignUpForm;