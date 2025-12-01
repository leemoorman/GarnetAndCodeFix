import '../css/Home.css';
import MainBox from '../components/MainBox';

const Home = () => {
    return (
        <main id="home-content">
            <h2 className='title-text'>Your Favorites</h2>
            <MainBox />
            <h2 id="live-text">Live &#8226;</h2>
            <MainBox />
            <h2 className='title-text'>Upcoming</h2>
            <MainBox />
            <h2 className='title-text'>Completed</h2>
            <MainBox />
        </main>
    );
};

export default Home;