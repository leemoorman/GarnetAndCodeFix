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
            <LoginSignUpForm formType="login" onSubmit={handleLogin} />
        </main>
    );
};

export default LoginSignUp;