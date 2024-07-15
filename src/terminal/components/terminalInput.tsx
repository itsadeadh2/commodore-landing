import React, { useEffect, KeyboardEvent, RefObject } from 'react';

interface TerminalInputProps {
    inputRef: RefObject<HTMLInputElement>;
    inputText: string;
    executing: boolean;
    onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const TerminalInput: React.FC<TerminalInputProps> = ({ inputRef, inputText, executing, onKeyPress }) => {
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    return (
        <>
            <div>
                &gt; {inputText}<span className="blinking-cursor"></span>
            </div>
            <input
                type="text"
                className="hidden-input"
                ref={inputRef}
                value=""
                onKeyDown={onKeyPress}
                onChange={() => {}} // Prevent React warning
                disabled={executing}
            />
        </>
    );
};

export default TerminalInput;
