// src/Callback.js
import React, { useState, useEffect } from 'react';

const Callback = () => {
  const [countdown, setCountdown] = useState(5); // Set the initial countdown value

  useEffect(() => {
    if (countdown === 0) {
      window.close();
    }

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000); // Decrease the countdown by 1 every second

    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, [countdown]);

  return (
    <div className="terminal">
      <div className="header">
        *** COMMODORE LANDING ***
      </div>
      <div className="header">
        REACT APP SYSTEM 2024 @THIAGO BARBOSA
      </div>
      <br/>
      <div className="command-history">
        Authentication successful!
      </div>
      <div className="command-history">
        This page will close in {countdown} seconds
      </div>
    </div>
  );
};

export default Callback;
