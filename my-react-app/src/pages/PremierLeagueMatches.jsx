import GameBox from '../components/GameBox';
import '../css/PremierLeagueMatches.css';

const PremierLeagueMatches = () =>{
    return(
        <main>
            <h3 id="location">Soccer / Matches / Premier League</h3>
            <div id="premier-league-content">
                <h2>Today's Matches</h2>
                <GameBox />
                <GameBox />
                <GameBox />
                <GameBox />
                <GameBox />
            </div>
        </main>
    );
};

export default PremierLeagueMatches;