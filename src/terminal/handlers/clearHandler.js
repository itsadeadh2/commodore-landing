import {COMMAND_STATUS, CommandResult, BaseHandler} from '.'

export default class ClearHandler extends BaseHandler{

  async handle(command){
    const result = super.handle(command);
    if (result) return result;

    return new CommandResult(
      COMMAND_STATUS.CLEAR,
      []
    )
  }

  static help() {
    return 'clear - clear all text in terminal'
  }
}