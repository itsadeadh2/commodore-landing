export default class BaseHandler {

  acceptsOneLiners = false

  isValidCommand(command) {
    return typeof command === 'string' && command.length > 0;
  }

  handle(action) {
  }
  static help() {
    return `If you see this it means I didnt implement help for this method yet. Sorry :/`;
  }
}
