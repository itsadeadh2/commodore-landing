// src/App.js
import React from 'react';
import Terminal from './terminal';
import Callback from './callback/callback'
import { Routes, Route } from 'react-router-dom';
import './App.css'; // Import App.css for the body styles
import StoreProvider from './terminal/commandHistory/store'

function App() {
  return (
    <div className="App">
        <StoreProvider>
          <Routes>
            <Route path="/callback" element={<Callback/>} />
            <Route path="/" exact element={<Terminal/>} />
          </Routes>
        </StoreProvider>
    </div>
  );
}

export default App;
