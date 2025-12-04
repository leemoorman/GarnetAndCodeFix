import { useEffect, useState } from 'react';
import GameBox from '../components/GameBox';
import '../css/PremierLeagueMatches.css';
const PremierLeagueMatches = () => {
    const [matches, setMatches] = useState([]);
    // format teams from csv w no ""
    const clean = (str = '') =>
        str.trim().replace(/^"(.*)"$/, '$1');

    useEffect(() => {
        const url = process.env.PUBLIC_URL + '/data/fixtures.csv';

        fetch(url)
            .then(res => res.text())
            .then(text => {
                const lines = text.trim().split('\n');
                const header = lines[0].split(',');
                const idxHome = header.indexOf('HomeTeam');
                const idxAway = header.indexOf('AwayTeam');
                const parsed = lines.slice(1).map((line, i) => {
                    const cols = line.split(',');

                    return {
                        id: i,
                        homeTeam: clean(cols[idxHome]),
                        awayTeam: clean(cols[idxAway])
                    };
                });

                setMatches(parsed);
            });
    }, []);
    return (
        <main>
            <h3 id="location">Soccer / Matches / Premier League</h3>
            <div id="premier-league-content">
                <h2>Matches</h2>
                {matches.map(match => (
                    <GameBox
                        key={match.id}
                        homeTeam={match.homeTeam}
                        awayTeam={match.awayTeam}
                    />
                ))}
            </div>
        </main>
    );
};

export default PremierLeagueMatches;
