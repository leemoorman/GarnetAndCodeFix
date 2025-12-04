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
import AstonVillaHome from './teampages/AstonVillaHome';
import BournemouthHome from './teampages/BournemouthHome';
import BrentfordHome from './teampages/BrentfordHome';
import BrightonHoveAlbionHome from './teampages/BrightonHoveAlbionHome';
import BurnleyHome from './teampages/BurnleyHome';
import ChelseaHome from './teampages/ChelseaHome';
import CrystalPalaceHome from './teampages/CrystalPalaceHome';
import EvertonHome from './teampages/EvertonHome';
import LeedsHome from './teampages/LeedsHome';
import LiverpoolHome from './teampages/LiverpoolHome';
import ManchesterCityHome from './teampages/ManchesterCityHome';
import ManchesterUnitedHome from './teampages/ManchesterUnitedHome';
import NewcastleHome from './teampages/NewcastleHome';
import NottinghamHome from './teampages/NottinghamHome';
import SunderlandHome from './teampages/SunderlandHome';
import TottenhamHome from './teampages/TottenhamHome';
import WestHamHome from './teampages/WestHamHome';
import WolverhamptonHome from './teampages/WolverhamptonHome';
import Login from './pages/Login';
import SignUp from './pages/SignUp';



const App = () =>{
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="matches" element={<MatchesLeague />} />
          <Route path="teams" element={<Teams />} />
          <Route path="predictions" element={<Predictions />} />
          <Route path="settings" element={<Settings />} />
          <Route path="matches/premier-league" element={<PremierLeagueMatches />} />
          <Route path="teams/premier-league" element={<PremierLeagueTeams />} />
          <Route path="teams/premier-league/arsenal" element={<ArsenalHome />} />
          <Route path="teams/premier-league/aston-villa" element={<AstonVillaHome />} />
          <Route path="teams/premier-league/bournemouth" element={<BournemouthHome />} />
          <Route path="teams/premier-league/brentford" element={<BrentfordHome />} />
          <Route path="teams/premier-league/brighton-hove-albion" element={<BrightonHoveAlbionHome />} />
          <Route path="teams/premier-league/burnley" element={<BurnleyHome />} />
          <Route path="teams/premier-league/chelsea" element={<ChelseaHome />} />
          <Route path="teams/premier-league/crystal-palace" element={<CrystalPalaceHome />} />
          <Route path="teams/premier-league/everton" element={<EvertonHome />} />
          <Route path="teams/premier-league/leeds-united" element={<LeedsHome />} />
          <Route path="teams/premier-league/liverpool" element={<LiverpoolHome />} />
          <Route path="teams/premier-league/manchester-city" element={<ManchesterCityHome />} />
          <Route path="teams/premier-league/manchester-united" element={<ManchesterUnitedHome />} />
          <Route path="teams/premier-league/newcastle-united" element={<NewcastleHome />} />
          <Route path="teams/premier-league/nottingham-forest" element={<NottinghamHome />} />
          <Route path="teams/premier-league/sunderland" element={<SunderlandHome />} />
          <Route path="teams/premier-league/tottenham-hotspur" element={<TottenhamHome />} />
          <Route path="teams/premier-league/west-ham-united" element={<WestHamHome />} />
          <Route path="teams/premier-league/wolverhampton-wanderers" element={<WolverhamptonHome />} />
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

