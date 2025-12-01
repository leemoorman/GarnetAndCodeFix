import {Link} from 'react-router-dom';
import premierimg from '../assets/premierleague.png';
import '../css/Teams.css';

const Teams = () => {
    return (
        <main id="teams-content">
            <h3 id="location">Soccer / Teams</h3>
            <h2 id="quest">What League Teams Would You Like To See?</h2>
            <Link to="/teams/premier-league">
                <section id="teams-section">
                    <div id="teams-container">
                        <img id="teams-img" src={premierimg}/>
                    </div>
                </section>
            </Link>
        </main>
    );
};

export default Teams;