import './../css/GameBox.css';
import { useNavigate } from 'react-router-dom';
import teamLogos from '../assets/teamLogo';

const GameBox = ({ homeTeam, awayTeam }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/matches/premier-league/match', {
      state: {
        homeTeam,
        awayTeam,
      },
    });
  };

  const homeLogo = teamLogos[homeTeam];
  const awayLogo = teamLogos[awayTeam];

  return (
    <div
      className="game-box"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      {/* Home team */}
      <div className="team team-home">
        {homeLogo && (
          <img
            src={homeLogo}
            alt={`${homeTeam} logo`}
            className="team-logo"
          />
        )}
        <span className="team-name">{homeTeam}</span>
      </div>

      {/* Center VS text */}
      <div className="vs">vs</div>

      {/* Away team */}
      <div className="team team-away">
        <span className="team-name">{awayTeam}</span>
        {awayLogo && (
          <img
            src={awayLogo}
            alt={`${awayTeam} logo`}
            className="team-logo"
          />
        )}
      </div>
    </div>
  );
};

export default GameBox;