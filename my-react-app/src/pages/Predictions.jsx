import { useEffect, useState } from 'react';
import '../css/Predictions.css';
import teamLogos from '../assets/teamLogo';

const Predictions = () => {
    const [matches, setMatches] = useState([]);
    const [standings, setStandings] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Clean CSV values
    const clean = (str = '') =>
        str.trim().replace(/^"(.*)"$/, '$1');
    
    // Map CSV team names to logo keys
    const getTeamLogo = (teamName) => {
        const teamNameMap = {
            'Arsenal': 'Arsenal FC',
            'Aston Villa': 'Aston Villa FC',
            'Bournemouth': 'AFC Bournemouth',
            'Brentford': 'Brentford FC',
            'Brighton': 'Brighton & Hove Albion FC',
            'Burnley': 'Burnley FC',
            'Chelsea': 'Chelsea FC',
            'Crystal Palace': 'Crystal Palace FC',
            'Everton': 'Everton FC',
            'Leeds': 'Leeds United FC',
            'Liverpool': 'Liverpool FC',
            'Man City': 'Manchester City FC',
            'Manchester City': 'Manchester City FC',
            'Man United': 'Manchester United FC',
            'Manchester United': 'Manchester United FC',
            'Newcastle': 'Newcastle United FC',
            'Nottingham Forest': 'Nottingham Forest FC',
            'Sunderland': 'Sunderland AFC',
            'Tottenham': 'Tottenham Hotspur FC',
            'West Ham': 'West Ham United FC',
            'Wolves': 'Wolverhampton Wanderers FC',
            'Wolverhampton': 'Wolverhampton Wanderers FC',
            'Fulham': 'Fulham FC'
        };
        
        const mappedName = teamNameMap[teamName];
        if (mappedName && teamLogos[mappedName]) {
            return teamLogos[mappedName];
        }
        
        if (teamLogos[teamName]) {
            return teamLogos[teamName];
        }
        
        for (const [key, logo] of Object.entries(teamLogos)) {
            if (key.includes(teamName) || teamName.includes(key.split(' ')[0])) {
                return logo;
            }
        }
        
        return 'https://b.fssta.com/uploads/application/soccer/team-logos/default.vresize.72.72.medium.0.png';
    };
    
    // Load standings data
    const loadStandings = async () => {
        try {
            const url = process.env.PUBLIC_URL + '/data/standings.csv';
            const response = await fetch(url);
            const text = await response.text();
            
            const lines = text.trim().split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            
            const standingsData = lines.slice(1).map(line => {
                const cols = line.split(',').map(c => clean(c));
                const team = {};
                headers.forEach((header, index) => {
                    team[header] = cols[index];
                });
                return team;
            });
            
            setStandings(standingsData);
            return standingsData;
        } catch (error) {
            console.error('Error loading standings:', error);
            return [];
        }
    };
    
    // CMake predictions based on standings data
    const calculatePrediction = (homeTeam, awayTeam, standingsData) => {
        if (!standingsData || standingsData.length === 0) {
            return calculateFallbackPrediction(homeTeam, awayTeam);
        }
        
        // Find teams in standings
        const homeStats = standingsData.find(team => {
            const squadName = team.Squad.toLowerCase();
            return squadName.includes(homeTeam.toLowerCase()) || 
                   homeTeam.toLowerCase().includes(squadName.split(' ')[0].toLowerCase());
        });
        
        const awayStats = standingsData.find(team => {
            const squadName = team.Squad.toLowerCase();
            return squadName.includes(awayTeam.toLowerCase()) || 
                   awayTeam.toLowerCase().includes(squadName.split(' ')[0].toLowerCase());
        });
        
        if (!homeStats || !awayStats) {
            return calculateFallbackPrediction(homeTeam, awayTeam);
        }
        
        // Parse stats
        const homePoints = parseInt(homeStats.Points) || 0;
        const awayPoints = parseInt(awayStats.Points) || 0;
        const homePosition = parseInt(homeStats.Position) || 20;
        const awayPosition = parseInt(awayStats.Position) || 20;
        const homeGD = parseInt(homeStats.GD) || 0;
        const awayGD = parseInt(awayStats.GD) || 0;
        const homeWinRate = parseInt(homeStats.W) / parseInt(homeStats.MP) || 0;
        const awayWinRate = parseInt(awayStats.W) / parseInt(awayStats.MP) || 0;
        
        // Calculate base probabilities based on standings
        const positionDiff = awayPosition - homePosition; 
        const pointsDiff = homePoints - awayPoints;
        const gdDiff = homeGD - awayGD;
        
        // Base win probability calculation
        let homeAdvantage = 0.15; // Home team advantage
        let positionWeight = 0.02 * positionDiff; // Each position difference
        let pointsWeight = 0.01 * pointsDiff; // Each point difference
        let gdWeight = 0.005 * gdDiff; // Goal difference
        let winRateWeight = (homeWinRate - awayWinRate) * 0.2;
        
        // Combine factors
        let homeWinProb = 0.5 + homeAdvantage + positionWeight + pointsWeight + gdWeight + winRateWeight;
        homeWinProb = Math.max(0.1, Math.min(0.9, homeWinProb)); 
        let awayWinProb = 1 - homeWinProb;
        
        // Draw probability adjustment
        const drawProb = 0.2 * (1 - Math.abs(homeWinProb - awayWinProb));
        homeWinProb = homeWinProb * (1 - drawProb);
        awayWinProb = awayWinProb * (1 - drawProb);
        
        // Determine prediction and confidence
        let prediction, confidence;
        const probDiff = Math.abs(homeWinProb - awayWinProb);
        
        if (homeWinProb > awayWinProb) {
            prediction = `${homeTeam} win`;
            if (probDiff > 0.25) confidence = 'high';
            else if (probDiff > 0.15) confidence = 'medium';
            else confidence = 'low';
        } else if (awayWinProb > homeWinProb) {
            prediction = `${awayTeam} win`;
            if (probDiff > 0.25) confidence = 'high';
            else if (probDiff > 0.15) confidence = 'medium';
            else confidence = 'low';
        } else {
            prediction = 'Draw';
            confidence = 'low';
        }
        
        return {
            homeTeam,
            awayTeam,
            homeLogo: getTeamLogo(homeTeam),
            awayLogo: getTeamLogo(awayTeam),
            homeWinProb,
            awayWinProb,
            drawProb,
            confidence,
            prediction,
            homeStats: {
                position: homeStats.Position,
                points: homeStats.Points,
                GD: homeStats.GD,
                W: homeStats.W,
                MP: homeStats.MP
            },
            awayStats: {
                position: awayStats.Position,
                points: awayStats.Points,
                GD: awayStats.GD,
                W: awayStats.W,
                MP: awayStats.MP
            }
        };
    };
    
    const calculateFallbackPrediction = (homeTeam, awayTeam) => {
        const homeHash = homeTeam.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const awayHash = awayTeam.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        
        const total = homeHash + awayHash;
        const homeWinProb = homeHash / total;
        const awayWinProb = awayHash / total;
        
        const sum = homeWinProb + awayWinProb;
        const normalizedHome = homeWinProb / sum;
        const normalizedAway = awayWinProb / sum;
        
        let prediction, confidence;
        if (normalizedHome > normalizedAway) {
            prediction = `${homeTeam} win`;
            confidence = normalizedHome > 0.6 ? 'high' : normalizedHome > 0.52 ? 'medium' : 'low';
        } else {
            prediction = `${awayTeam} win`;
            confidence = normalizedAway > 0.6 ? 'high' : normalizedAway > 0.52 ? 'medium' : 'low';
        }
        
        return {
            homeTeam,
            awayTeam,
            homeLogo: getTeamLogo(homeTeam),
            awayLogo: getTeamLogo(awayTeam),
            homeWinProb: normalizedHome,
            awayWinProb: normalizedAway,
            drawProb: 0,
            confidence,
            prediction
        };
    };
    
    useEffect(() => {
        const loadPredictions = async () => {
            setLoading(true);
            try {
                // Load standings first
                const standingsData = await loadStandings();
                
                // Load matches from fixtures CSV
                const fixturesUrl = process.env.PUBLIC_URL + '/data/fixturesmd15.csv';
                const fixturesResponse = await fetch(fixturesUrl);
                const fixturesText = await fixturesResponse.text();
                
                const lines = fixturesText.trim().split('\n');
                const header = lines[0].split(',');
                const idxHome = header.indexOf('HomeTeam');
                const idxAway = header.indexOf('AwayTeam');
                
                const parsedMatches = lines.slice(1).map((line, i) => {
                    const cols = line.split(',');
                    const homeTeam = clean(cols[idxHome]);
                    const awayTeam = clean(cols[idxAway]);
                    
                    const prediction = calculatePrediction(homeTeam, awayTeam, standingsData);
                    
                    return {
                        id: i,
                        homeTeam,
                        awayTeam,
                        ...prediction
                    };
                });
                
                setMatches(parsedMatches.slice(0, 12));
                
            } catch (error) {
                console.error('Error loading predictions:', error);
                setMatches([]);
            } finally {
                setLoading(false);
            }
        };
        
        loadPredictions();
    }, []);
    
    const renderMatchPrediction = (match) => {
        const homePercent = (match.homeWinProb * 100).toFixed(1);
        const awayPercent = (match.awayWinProb * 100).toFixed(1);
        const drawPercent = match.drawProb ? (match.drawProb * 100).toFixed(1) : '0.0';
        
        const confidenceConfig = {
            high: { label: 'High', color: '#4CAF50' },
            medium: { label: 'Medium', color: '#FF9800' },
            low: { label: 'Low', color: '#F44336' }
        };
        
        const conf = confidenceConfig[match.confidence] || confidenceConfig.medium;
        
        return (
            <div key={match.id} className="prediction-box">
                {/* Match Teams with Logos */}
                <div className="match-teams">
                    <div className="team-section home">
                        <div className="team-logo-container">
                            <img 
                                src={match.homeLogo} 
                                alt={match.homeTeam} 
                                className="team-logo"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://b.fssta.com/uploads/application/soccer/team-logos/default.vresize.72.72.medium.0.png';
                                }}
                            />
                        </div>
                        <div className="team-name">{match.homeTeam}</div>
                        {match.homeStats && (
                            <div className="team-stats">
                                <span className="stat-badge">#{match.homeStats.position}</span>
                                <span className="stat-badge">{match.homeStats.points} pts</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="match-divider">
                        <span className="vs">vs</span>
                    </div>
                    
                    <div className="team-section away">
                        <div className="team-logo-container">
                            <img 
                                src={match.awayLogo} 
                                alt={match.awayTeam} 
                                className="team-logo"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://b.fssta.com/uploads/application/soccer/team-logos/default.vresize.72.72.medium.0.png';
                                }}
                            />
                        </div>
                        <div className="team-name">{match.awayTeam}</div>
                        {match.awayStats && (
                            <div className="team-stats">
                                <span className="stat-badge">#{match.awayStats.position}</span>
                                <span className="stat-badge">{match.awayStats.points} pts</span>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Prediction Result */}
                <div className="prediction-summary">
                    <div className="prediction-icon">
                        {match.prediction.includes(match.homeTeam) ? '🏠' : 
                         match.prediction.includes(match.awayTeam) ? '✈️' : '⚖️'}
                    </div>
                    <div className="prediction-text">
                        <div className="prediction-outcome">{match.prediction}</div>
                        <div className="confidence-indicator" style={{ color: conf.color }}>
                            {conf.label} Confidence
                        </div>
                    </div>
                </div>
                
                {/* Probability Bars */}
                <div className="probability-display">
                    <div className="probability-row">
                        <div className="team-probability">
                            <span className="team-label">{match.homeTeam}</span>
                            <span className="prob-value">{homePercent}%</span>
                        </div>
                        <div className="probability-bar">
                            <div 
                                className="probability-fill home-fill" 
                                style={{ width: `${homePercent}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <div className="probability-row">
                        <div className="team-probability">
                            <span className="team-label">Draw</span>
                            <span className="prob-value">{drawPercent}%</span>
                        </div>
                        <div className="probability-bar">
                            <div 
                                className="probability-fill draw-fill" 
                                style={{ width: `${drawPercent}%` }}
                            ></div>
                        </div>
                    </div>
                    
                    <div className="probability-row">
                        <div className="team-probability">
                            <span className="team-label">{match.awayTeam}</span>
                            <span className="prob-value">{awayPercent}%</span>
                        </div>
                        <div className="probability-bar">
                            <div 
                                className="probability-fill away-fill" 
                                style={{ width: `${awayPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    
    if (loading) {
        return (
            <main>
                <h3 id="location">Soccer / Predictions</h3>
                <div id="predictions-content">
                    <h2>Match Predictions</h2>
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Calculating predictions based on current standings...</p>
                    </div>
                </div>
            </main>
        );
    }
    
    return (
        <main>
            <h3 id="location">Soccer / Predictions</h3>
            <div id="predictions-content">
                <h2>Match Predictions</h2>
                <p className="predictions-subtitle">
                    Matchday 15 Predictions Based on Current Premier League Standings
                </p>
                <div className="predictions-grid">
                    {matches.length > 0 ? (
                        matches.map(match => renderMatchPrediction(match))
                    ) : (
                        <div className="no-predictions">
                            <p>No predictions available. Please check your data files.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Predictions;