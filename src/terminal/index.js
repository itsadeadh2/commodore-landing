// src/Terminal.js
import React, { useState, useEffect, useRef } from 'react';
import './terminal.css';
import { useSelector } from 'react-redux';
import useExecuteCommand from './executor';


const Terminal = () => {
    let executing = false;
    const [inputText, setInputText] = useState('');
    const inputRef = useRef(null);
    const { executeCommand } = useExecuteCommand();
    const commandHistory = useSelector(state => state.commandHistory);
    const hasMounted = useRef(false);

    useEffect(() => {
        if (hasMounted.current) {
          return;
        }
        async function run() {

          // Focus the input field when the component mounts
          inputRef.current.focus();
          await executeCommand('help')
        }
        run();
        hasMounted.current = true;

    }, [executeCommand]);

    const handleKeyPress = async (event) => {
        if (event.key === 'Enter') {
            // Process the command and get the response
            if (executing) {
              event.preventDefault()
              return;
            }
            executing = true;
            await executeCommand(inputText);
            executing = false;
            setInputText('');
            event.preventDefault();
        } else if (event.key === 'Backspace') {
            setInputText(inputText.slice(0, -1));
            event.preventDefault();
        } else if (event.key.length === 1) {
            setInputText(inputText + event.key);
            event.preventDefault();
        }

        // Prevent default action for keys we want to handle differently
        if (['Enter', 'Backspace', 'Alt', 'Delete', 'Meta', 'Control', 'Shift'].includes(event.key)) {
            event.preventDefault();
        }
    };

    return (
        <div className="terminal" onClick={() => inputRef.current.focus()}>
            <div className="header">
                ***   COMMODORE LANDING   ***
            </div>
            <div className="header">
                REACT APP SYSTEM  2024 @THIAGO BARBOSA
            </div>
            <br />
            {commandHistory.map((entry, index) => (
                <div key={index} className="command-history">
                    {entry}
                </div>
            ))}
            <div>
                &gt; {inputText}<span className="blinking-cursor"></span>
            </div>
            <input
                type="text"
                className="hidden-input"
                ref={inputRef}
                value=""
                onKeyDown={handleKeyPress}
                onChange={() => {}} // Prevent React warning
            />
        </div>
    );
};

export default Terminal;
