import {
  COMMAND_STATUS,
  CommandResult,

  BaseHandler,
  ContactHandler,
  ClearHandler,
  AboutHandler,
  ProjectsHandler,
  CommodoreHandler,
} from "."

export default class HelpHandler extends BaseHandler{

  async handle(command){
    const result = super.handle(command);
    if (result) return result;

    return new CommandResult(
      COMMAND_STATUS.SUCCESS,
      [
        'Available commands:',
        '',
        ContactHandler.help(),
        ClearHandler.help(),
        AboutHandler.help(),
        ProjectsHandler.help(),
        HelpHandler.help(),
        CommodoreHandler.help()
      ]
    )
  }

  static help() {
    return 'help - see help messages for available commands'
  }
}