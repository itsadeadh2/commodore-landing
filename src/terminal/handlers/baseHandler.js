import {CommandResult, COMMAND_STATUS} from '.'
export default class BaseHandler {

  acceptsOneLiners = false

  getAction (command) {
    const root = this.getCommandRoot(command)
    const action = command.split(' ').pop()
    if (root === action) return ''
    return action
  }

  getCommandRoot (command) {
    return command.split(' ')[0]
  }

  isValidCommand(command) {
    return typeof command === 'string' && command.length > 0;
  }

  handle(command) {
    if (!this.isValidCommand(command)) {
      return new CommandResult(
        COMMAND_STATUS.FAILURE,
        ['Invalid Command']
      )
    }
  }
  static help() {
    return `If you see this it means I didnt implement help for this method yet. Sorry :/`;
  }
}
