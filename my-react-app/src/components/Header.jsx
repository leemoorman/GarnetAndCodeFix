import '../css/Header.css';
import Navigation from './Navigation';

const Header = () => {
    return (
        <header id="main-header">
            <Navigation />
            <input type="text" placeholder="Search..." />
        </header>
    );
};

export default Header;