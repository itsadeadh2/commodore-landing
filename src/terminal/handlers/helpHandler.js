import {
  COMMAND_STATUS,
  CommandResult,

  BaseHandler,
  ContactHandler,
  ClearHandler,
  AboutHandler,
  ProjectsHandler,
  CommodoreHandler,
  LoginHandler
} from "."

export default class HelpHandler extends BaseHandler{

  static context = 'help'
  acceptsOneLiners = false

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
        CommodoreHandler.help(),
        LoginHandler.help(),
        //ContextTestHandler.help()
      ]
    )
  }

  static help() {
    return 'help - see help messages for available commands'
  }
}