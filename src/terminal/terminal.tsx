import {ReactElement} from "react";

export default class Terminal {
  private commandHistory: (string | ReactElement)[];
  constructor() {
    this.commandHistory = [];
  }

  print(text: string | ReactElement ) {
    this.commandHistory.push(text);
  }

  clear() {
    this.commandHistory = [];
  }

  getHistory() {
    return this.commandHistory;
  }
}