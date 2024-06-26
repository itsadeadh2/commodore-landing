// src/useExecuteCommand.js
import { useDispatch } from 'react-redux';
import { addCommand, clearCommands } from './commandHistory/commandHistorySlice';
import { commandSelector} from './commandSelector';
import { COMMAND_STATUS } from './handlers'

const useExecuteCommand = () => {
    const dispatch = useDispatch();

    const executeCommand = async (inputText) => {
        const result = await commandSelector(inputText);

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
