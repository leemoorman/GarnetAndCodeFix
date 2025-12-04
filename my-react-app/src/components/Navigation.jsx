import '../css/Navigation.css';
import {Link} from 'react-router-dom';

const Navigation = () => {
    return (
        <nav id="main-nav">
            <ul id="nav-list">
                <li><Link to="/home" className="my-link">Home</Link></li>
                <li><Link to="/matches" className="my-link">Matches</Link></li>
                <li><Link to="/teams" className="my-link">Teams</Link></li>
                <li><Link to="/predictions" className="my-link">Predictions</Link></li>
                <li><Link to="/settings" className="my-link">Settings</Link></li>
                <li><Link to="/" className="my-link logout-link">Logout</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation; 