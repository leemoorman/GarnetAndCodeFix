import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/LoginForm.css';

const SignUp = () => {
    return (
        <div className="login-container">
            <h1>Create Account</h1>

            <form className="login-form">
                <label>Username:</label>
                <input type="text" placeholder="Enter your username" required />

                <label>Email:</label>
                <input type="email" placeholder="Enter your email" required />

                <label>Password:</label>
                <input type="password" placeholder="Enter your password" required />

                <label>Confirm Password:</label>
                <input type="password" placeholder="Confirm your password" required />

                <button type="button" className="login-button">
                    Sign Up
                </button>
            
            <p className="signup-link">
                Already have an account? <strong><Link to="/">Back to Login</Link></strong>
            </p>
            </form>
        </div>
    );
}

export default SignUp;