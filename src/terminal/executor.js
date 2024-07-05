import { useDispatch } from 'react-redux';
import { addCommand, clearCommands } from './commandHistory/commandHistorySlice';
import { handlerSelector } from './handlerSelector';
import { COMMAND_STATUS, CommandResult } from './handlers';

const useExecuteCommand = () => {
    const dispatch = useDispatch();

    // Normalize the command by trimming whitespace and converting to lowercase
    const normalizeCommand = (command) => command.trim().toLowerCase();

    // Get the root command from the input by splitting on spaces and taking the first part
    const getRootCommand = (command) => command.split(' ')[0];

    // Get the action part of the command if it exists
    const getCommandAction = (command) => {
        const commandParts = command.split(' ');
        if (commandParts.length > 1) {
            return commandParts.slice(1).join(' ');
        }
        return '';
    };

    const executeCommand = async (inputText, context = 'main') => {
        // Normalize and parse the command
        const normalizedCommand = normalizeCommand(inputText);
        const rootCommand = getRootCommand(normalizedCommand);
        const action = getCommandAction(normalizedCommand);

        // Select the appropriate handler for the root command and context
        const handler = handlerSelector(rootCommand, context);

        // Default result for unrecognized commands
        let result = new CommandResult(
          COMMAND_STATUS.FAILURE,
          [`Command not recognized: ${inputText}`],
          context
        );

        // If no handler is found, log the unrecognized command and return the current context
        if (!handler) {
            dispatch(addCommand(`> ${inputText}`));
            result.response.forEach((line) => dispatch(addCommand(line)));
            return result.context;
        }

        // Check if the command is a composite (contains both a root command and action)
        const isCompositeCommand = !!action && !!rootCommand;

        // Handle one-liner commands if the handler accepts them
        if (handler.acceptsOneLiners && isCompositeCommand) {
            result = await handler.handle(action);
        }

        // Handle commands without actions
        if (!isCompositeCommand) {
            result = await handler.handle(rootCommand);
        }

        // Dispatch the command and its response to the command history
        dispatch(addCommand(`> ${inputText}`));
        result.response.forEach((line) => dispatch(addCommand(line)));

        // Handle special command statuses
        if (result.status === COMMAND_STATUS.CLEAR) {
            dispatch(clearCommands());
            if (result.response.length > 0) {
                result.response.forEach((line) => dispatch(addCommand(line)));
            }
        }

        // Return the updated context from the command result
        return result.context;
    };

    return { executeCommand };
};

export default useExecuteCommand;
