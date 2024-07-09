import React, {useState, useEffect, useRef, KeyboardEvent, ReactElement} from 'react';
import './terminal.css';
import ProgramsManager from './programsManager';

const TerminalManager: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [executing, setExecuting] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasMounted = useRef<boolean>(false);
  const manager = useRef<ProgramsManager | null>(null);

  useEffect(() => {
    if (hasMounted.current) {
      return;
    }
    manager.current = new ProgramsManager();
    async function run() {
      // Focus the input field when the component mounts
      inputRef.current?.focus();
      const initialCommand = 'help'
      setInputText(initialCommand)
      await manager.current?.execute(initialCommand);
      setInputText('')
    }
    run();
    hasMounted.current = true;
  }, []);

  const handleKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      // Process the command and get the response
      if (executing) {
        event.preventDefault();
        return;
      }
      setExecuting(true);
      const originalText = inputText;
      setInputText('');
      await manager.current?.execute(originalText);
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
      <div className="terminal" onClick={() => inputRef.current?.focus()}>
        <div className="header">
          ***   COMMODORE LANDING   ***
        </div>
        <div className="header">
          REACT APP SYSTEM  2024 @THIAGO BARBOSA
        </div>
        <br />
        {manager.current?.getHistory().map((entry: string | ReactElement, index: number) => (
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
