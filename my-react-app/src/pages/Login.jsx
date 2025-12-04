import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import LoginForm from '../components/LoginForm.jsx';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (username, password) => {
        const demoUser = "username";
        const demoPass = "password";

        if(username === demoUser && password === demoPass) {
            localStorage.setItem("user", JSON.stringify({ username: demoUser}));
            navigate('/home');
        } else {
            alert("Invalid credentials.");
        }
    };

    return (
        <main id="login-content">
            <LoginForm formType="login" onSubmit={handleLogin} />
        </main>
    );
};

export default Login;