// src/useExecuteCommand.js
import { useDispatch } from 'react-redux';
import { addCommand, clearCommands } from './commandHistory/commandHistorySlice';
import { handlerSelector} from './handlerSelector';
import {COMMAND_STATUS, CommandResult} from './handlers'

const useExecuteCommand = () => {
    const dispatch = useDispatch();

    const normalizeCommand = (command) => command.trim().toLowerCase();
    const getRootCommand = (command) => command.split(' ')[0];

    const executeCommand = async (inputText, context='main') => {

        const normalizedCommand = normalizeCommand(inputText);
        const rootCommand =  getRootCommand(normalizedCommand);
        
        const handler = handlerSelector(rootCommand, context);
        if (!handler) {
            return new CommandResult(
              COMMAND_STATUS.FAILURE,
              [`Command not recognized: ${rootCommand}`]
            )
        }
        const result = await handler.handle(normalizedCommand);

        // Handle result
        if (result.status === COMMAND_STATUS.SUCCESS || result.status === COMMAND_STATUS.FAILURE) {
            dispatch(addCommand(`> ${inputText}`));
            result.response.forEach((line) => dispatch(addCommand(line)))
        }

        if (result.status === COMMAND_STATUS.CLEAR) {
            dispatch(clearCommands());
            if (result.response.length > 0) {
                result.response.forEach((line) => dispatch(addCommand(line)))
            }
        }
        return result.context || 'main';
    };

    return { executeCommand };
};

export default useExecuteCommand;
