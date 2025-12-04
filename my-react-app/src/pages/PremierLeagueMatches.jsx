import { useEffect, useState } from 'react';
import GameBox from '../components/GameBox';
import '../css/PremierLeagueMatches.css';

const PremierLeagueMatches = () => {
  const [matches, setMatches] = useState([]);
  const [predictions, setPredictions] = useState({});

  useEffect(() => {
    // load the fixtures.csv file
    const url = process.env.PUBLIC_URL + '/data/fixtures.csv';

    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        const lines = text.split('\n');
        const rows = lines.slice(1);

        const matchList = rows.map((row, index) => {
          const parts = row.split(',');
          // format
          const home = parts[0].replace(/"/g, '');
          const away = parts[1].replace(/"/g, '');
          return {
            id: index,
            homeTeam: home,
            awayTeam: away,
          };
        });
        setMatches(matchList);
      });
  }, []);

  const handlePredictionChange = (matchId, prediction) => {
    setPredictions((prev) => ({ ...prev, [matchId]: prediction }));
  };

  const handleSubmitPredictions = () => {
    console.log('User Predictions:', predictions);
    alert('Predictions submitted!');
  };

  return (
    <main>
      <h3 id="location">Soccer / Matches / Premier League</h3>

      <div id="premier-league-content">
        <h2>Matches</h2>
        {matches.map((match) => (
          <div key={match.id} className="match-container">
            <GameBox homeTeam={match.homeTeam} awayTeam={match.awayTeam} />
            <div className="prediction-input">
              <label htmlFor={`prediction-${match.id}`}>Your Prediction:</label>
              <input
                id={`prediction-${match.id}`}
                type="text"
                placeholder="e.g., Home Win, Away Win, Draw"
                value={predictions[match.id] || ''}
                onChange={(e) => handlePredictionChange(match.id, e.target.value)}
              />
            </div>
          </div>
        ))}
        <button className="submit-button" onClick={handleSubmitPredictions}>
          Submit Predictions
        </button>
      </div>
    </main>
  );
};
export default PremierLeagueMatches;