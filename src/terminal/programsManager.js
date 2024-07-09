// src/TerminalManager.js
import Terminal from "./terminal";

class ProgramsManager {
  constructor() {
    this.commandHistory = [];
    this.terminal = new Terminal()
  }

  execute(inputText) {
    const command = new Command(inputText);
    //if
    if (inputText === 'help') {
      this.terminal.print('This is a help command :D')
    }
  }

  getHistory() {
    return this.terminal.getHistory();
  }
}

export default ProgramsManager;

class Program {
  constructor(terminal) {
    this.terminal = terminal;
  }

  execute(command) {

  }
}

class Command {
  constructor(command) {
    const normalizedCommand = Command.normalizeCommand(command);
    const commandParts = normalizedCommand.split(' ')

    this.root = commandParts[0];
    if (commandParts.length > 1) {
      this.params = commandParts.slice(1);
    }

  }

  static normalizeCommand = (command) => command.trim().toLowerCase();

}