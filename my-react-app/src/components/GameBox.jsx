import './../css/GameBox.css';
import pic from '../assets/premierleague.png';   // placeholder for pics until they are uploaded into the assets folder

const GameBox = ({ homeTeam, awayTeam }) => {
  return (
    <div className="game-box">

      {/* Home team */}
      <div className="team team-home">
        <img src={pic} alt="Home Team Logo" className="team-logo" />
        <span className="team-name">{homeTeam}</span>
      </div>

      {/* Center VS text */}
      <div className="vs">vs</div>

      {/* Away team */}
      <div className="team team-away">
        <span className="team-name">{awayTeam}</span>
        <img src={pic} alt="Away Team Logo" className="team-logo" />
      </div>

    </div>
  );
};

export default GameBox;
