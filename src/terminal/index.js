import React, { useState, useEffect, useRef } from 'react';
import './terminal.css';
import useExecuteCommand from './executor';
import ProgramsManager from './programsManager'


const TerminalManager = () => {
    const [inputText, setInputText] = useState('');
    const [executing, setExecuting] = useState(false);
    const inputRef = useRef(null);
    const { executeCommand } = useExecuteCommand();
    const hasMounted = useRef(false);
    const manager = useRef(new ProgramsManager());

    useEffect(() => {
        if (hasMounted.current) {
          return;
        }
        async function run() {
          // Focus the input field when the component mounts
          inputRef.current.focus();
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
            setExecuting(true);
            manager.current.execute(inputText);
            setExecuting(false);
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
            {manager.current.getHistory().map((entry, index) => (
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

export default TerminalManager;
