// src/App.js
import React from 'react';
import Terminal from './terminal';
import './App.css'; // Import App.css for the body styles
import StoreProvider from './terminal/commandHistory/store'

function App() {
  return (
      <div className="App">
          <StoreProvider>
              <Terminal />
          </StoreProvider>
      </div>
  );
}

export default App;
