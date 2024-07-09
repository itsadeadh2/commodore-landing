// src/TerminalManager.js
class Terminal {
  constructor() {
    this.commandHistory = [];
  }

  print(text) {
    this.commandHistory.push(text);
  }

  clear() {
    this.commandHistory = [];
  }

  getHistory() {
    return this.commandHistory;
  }
}

export default Terminal;
