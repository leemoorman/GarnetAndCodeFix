import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import MatchesLeague from './pages/MatchesLeague';
import Teams from './pages/Teams';
import Predictions from './pages/Predictions';
import Settings from './pages/Settings';
import PremierLeagueMatches from './pages/PremierLeagueMatches';
import PremierLeagueTeams from './pages/PremierLeagueTeams';
import ArsenalHome from './teampages/ArsenalHome';

const App = () =>{
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/matches" element={<MatchesLeague />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/matches/premier-league" element={<PremierLeagueMatches />} />
          <Route path="/teams/premier-league" element={<PremierLeagueTeams />} />
          <Route path="/teams/premier-league/arsenal" element={<ArsenalHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

