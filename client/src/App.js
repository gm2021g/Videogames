import styles from './App.module.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import VideoGameCreate from './components/VideoGameCreate';
import Details from "./components/Details";
// 
function App() {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/videogames' element={<VideoGameCreate />} />
          <Route path='/videogames/:id' element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

