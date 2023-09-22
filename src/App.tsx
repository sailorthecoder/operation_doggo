import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import DogSearchPage from './pages/DogSearchPage';
import MatchPage from './pages/MatchPage';
import './App.css';

axios.defaults.baseURL = 'https://frontend-take-home-service.fetch.com';

const App = () => {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/search" element={<DogSearchPage/>}/>
          <Route path="/match/" element={<MatchPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
