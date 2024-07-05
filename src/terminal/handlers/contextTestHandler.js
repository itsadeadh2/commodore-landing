import {COMMAND_STATUS, CommandResult, BaseHandler} from '.'

export default class ContextTestHandler extends BaseHandler{
  static context = 'context'

  acceptsOneLiners = false

  actionsMapping = {
    '': this.handleUnknownAction.bind(this),
    'hello': this.handleHelloAction.bind(this),
    'exit': this.handleExitAction.bind(this),
    'context': this.handleEnterAction.bind(this)
  }

  handleEnterAction() {
    return new CommandResult(
      COMMAND_STATUS.SUCCESS,
      [
        'This is a work in progress functionality',
        'if you entered here by mistake just use "exit" to return to the main menu',
      ],
      ContextTestHandler.context
    )
  }

  handleHelloAction() {
    return new CommandResult(
      COMMAND_STATUS.SUCCESS,
      [
        'Hello, how are you?'
      ],
      ContextTestHandler.context
    )
  }

  handleExitAction() {
    return new CommandResult(
      COMMAND_STATUS.SUCCESS,
      [
        'Bye ;)'
      ]
    )
  }

  handleUnknownAction() {
    return new CommandResult(
      COMMAND_STATUS.SUCCESS,
      [
        'Sorry, cant understand what you said :('
      ]
    )
  }

  async handle(action){

   const actionHandle = this.actionsMapping[action] || this.handleUnknownAction.bind(this);
   return actionHandle(action);

  }

  static help() {
    return 'context - test'
  }
}