import {Link} from 'react-router-dom';
import '../css/MatchesLeague.css';
import premier from "../assets/premierleague.png";

const MatchesLeague = () => {
    return (
        <main id="matches-league-content">
            <h3 id="location">Soccer / Matches</h3>
            <h2 id="quest">Which League's Matches Would You Like To See?</h2>
            <Link to="/matches/premier-league">
                <section id="premier-section">
                    <div id="premier-container">
                        <img id="premier-img" src={premier}/>
                    </div>
                </section> 
            </Link>
        </main>
    );
};

export default MatchesLeague;