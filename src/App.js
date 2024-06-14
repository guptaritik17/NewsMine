import './App.css';
import React, { useState } from 'react';
import NavBar from './components/Navbar';
import News from './components/News';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleStyle = () => {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  };

  document.documentElement.setAttribute('data-bs-theme', mode);

  return (
    <div>
      <Router>
        <NavBar toggleStyle={toggleStyle} setSearchQuery={setSearchQuery} /> 
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress} 
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" searchQuery={searchQuery} />}></Route> 
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" searchQuery={searchQuery} />}></Route> 
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" searchQuery={searchQuery} />}></Route> 
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" searchQuery={searchQuery} />}></Route> 
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" searchQuery={searchQuery} />}></Route> 
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" searchQuery={searchQuery} />}></Route> 
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" searchQuery={searchQuery} />}></Route> 
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" searchQuery={searchQuery} />}></Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
