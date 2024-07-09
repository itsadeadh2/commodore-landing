import React from 'react';
import TerminalManager from './terminal';
import Callback from './callback/callback';
import { Routes, Route } from 'react-router-dom';
import './App.css'; // Import App.css for the body styles
import StoreProvider from './terminal/commandHistory/store';

const App: React.FC = () => {
  return (
      <div className="App">
        <StoreProvider>
          <Routes>
            <Route path="/callback" element={<Callback />} />
            <Route path="/" element={<TerminalManager />} />
          </Routes>
        </StoreProvider>
      </div>
  );
};

export default App;
