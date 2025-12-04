import { useNavigate } from 'react-router-dom';
import '../css/LoginSignUp.css';
import LoginSignUpForm from '../components/LoginSignUpForm';

const LoginSignUp = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/home');
    };

    return (
        <main id="login-signup-content">
            <h2 className='title-text'>Login</h2>
            <LoginSignUpForm formType="login" onSubmit={handleLogin} />

            <h2 className='title-text'>Sign Up</h2>
            <LoginSignUpForm formType="signup" onSubmit={handleLogin} />
        </main>
    );
};

export default LoginSignUp;