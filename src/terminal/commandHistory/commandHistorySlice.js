const initialState = [];

const ADD_COMMAND = 'commandHistory/addCommand';
const CLEAR_COMMANDS = 'commandHistory/clearCommands';

export const addCommand = (command) => ({
    type: ADD_COMMAND,
    payload: command,
});

export const clearCommands = () => ({
    type: CLEAR_COMMANDS,
});

const commandHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_COMMAND:
            return [...state, action.payload];
        case CLEAR_COMMANDS:
            return [];
        default:
            return state;
    }
};

export default commandHistoryReducer;
