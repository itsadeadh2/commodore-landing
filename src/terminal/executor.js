// src/useExecuteCommand.js
import { useDispatch } from 'react-redux';
import { addCommand, clearCommands } from './commandHistory/commandHistorySlice';
import { commandHandler, COMMAND_STATUS } from './commandHandler';

const useExecuteCommand = () => {
    const dispatch = useDispatch();

    const executeCommand = (inputText) => {
        const result = commandHandler(inputText);

        // Handle result
        if (result.status === COMMAND_STATUS.SUCCESS || result.status === COMMAND_STATUS.FAILURE) {
            dispatch(addCommand(`> ${inputText}`));
            result.response.forEach((line) => dispatch(addCommand(line)))
        }

        if (result.status === COMMAND_STATUS.CLEAR) {
            dispatch(clearCommands());
        }
    };

    return { executeCommand };
};

export default useExecuteCommand;
