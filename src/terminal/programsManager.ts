import Terminal from "./terminal";
import { Program } from "./programs/program"
import ProgramsFactory from "./programsFactory"
import Command from "./command"
import {ReactElement} from "react";

export default class ProgramsManager {
  private readonly terminal: Terminal;
  private readonly programs: Map<string, Program>; // use a program factory
  private currentProgram: Program;
  private readonly defaultProgram: Program;


  constructor() {
    this.terminal = new Terminal();
    const factory = new ProgramsFactory(this.terminal, this.setProgram);
    this.defaultProgram = factory.default;
    this.programs = factory.programs;
    this.currentProgram = this.defaultProgram;
    console.log(`Current programs: ${this.programs}`)

  }

  // this has to be a lambda, so it keeps "this" scoped at this class
  private setProgram = async (programName: string, command?: Command): Promise<void> => {
    const program = this.programs.get(programName);
    if (!program) {
      this.currentProgram = this.defaultProgram;
      return;
    }
    this.currentProgram = program;
    if (!!command) {
      return this.currentProgram.handle(command)
    }
  }

  async execute(inputText: string): Promise<void> {
    const command = new Command(inputText);
    return this.currentProgram.handle(command);
  }

  getHistory(): (string | ReactElement)[] {
    return this.terminal.getHistory();
  }
}