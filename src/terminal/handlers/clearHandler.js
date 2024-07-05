import {COMMAND_STATUS, CommandResult, BaseHandler} from '.'

export default class ClearHandler extends BaseHandler{

  static context = 'clear'

  async handle(action){


    return new CommandResult(
      COMMAND_STATUS.CLEAR,
      []
    )
  }

  static help() {
    return 'clear - clear all text in terminal'
  }
}