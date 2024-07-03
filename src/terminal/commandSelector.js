// src/commandHandler.js
import {
    COMMAND_STATUS,
    CommandResult,

    ContactHandler,
    HelpHandler,
    ClearHandler,
    AboutHandler,
    ProjectsHandler,
    CommodoreHandler,
    LoginHandler
} from "./handlers"

export const commandSelector = async (command) => {
    const normalizedCommand = command.trim().toLowerCase();
    const rootCommand = normalizedCommand.split(' ')[0];
    const commandHandlersMapping = {
        help: HelpHandler,
        projects: ProjectsHandler,
        about: AboutHandler,
        clear: ClearHandler,
        contact: ContactHandler,
        commodore: CommodoreHandler,
        login: LoginHandler
    }
    const commandHandler = commandHandlersMapping[rootCommand];
    if (!commandHandler) {
        return new CommandResult(
          COMMAND_STATUS.FAILURE,
          [`Command not recognized: ${command}`]
        )
    }

    const handler = new commandHandler(normalizedCommand);
    return handler.handle(normalizedCommand);
};
