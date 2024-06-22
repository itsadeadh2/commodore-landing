// src/commandHandler.js
import CommandService from "./commandService";

const commandHandler = (command) => {
    const service = new CommandService();
    const normalizedCommand = command.trim().toLowerCase();
    let response = ''

    switch (normalizedCommand) {
        case 'help':
            response = new CommandResult(
                COMMAND_STATUS.SUCCESS,
                ["Available commands: help, projects, about, contact"]
            )
            break;
        case 'projects':
            response = new CommandResult(
                COMMAND_STATUS.SUCCESS,
                service.projects()
            )
            break;
        case 'about':
            response = new CommandResult(
                COMMAND_STATUS.SUCCESS,
                service.about()
            )
            break;
        case 'clear':
            response = new CommandResult(
                COMMAND_STATUS.CLEAR,
                ['']
            )
            break;
        case 'contact':
            response = new CommandResult(
                COMMAND_STATUS.SUCCESS,
                service.contact()
            )
            break;
        default:
            response = new CommandResult(
                COMMAND_STATUS.FAILURE,
                [`Command not recognized: ${command}`]
            )
            break;
    }

    return response;
};

class CommandResult {
    status = ''
    response = []
    constructor(status, response) {
        this.status = status;
        this.response = response;
    }
}

const COMMAND_STATUS = {
    SUCCESS: 200,
    FAILURE: 500,
    CLEAR: 201
}

export {
    commandHandler,
    COMMAND_STATUS,
    CommandResult
}
