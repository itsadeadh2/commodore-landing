// CommandHistory.tsx
import React from 'react';

interface CommandHistoryProps {
    history: (string | React.ReactElement)[];
}

const CommandHistory: React.FC<CommandHistoryProps> = ({ history }) => (
    <>
        {history.map((entry, index) => (
            <div key={index} className="command-history">
                {entry}
            </div>
        ))}
    </>
);

export default CommandHistory;
