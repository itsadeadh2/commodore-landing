import Terminal from "./terminal";
import { ProgramBase } from "./programs/program.base"
import ProgramsFactory from "./programsFactory"
import Command from "./command"
import {ReactElement} from "react";

export default class ProgramsManager {
  private readonly terminal: Terminal;
  private readonly programs: Map<string, ProgramBase>; // use a program factory
  private currentProgram: ProgramBase;
  private readonly defaultProgram: ProgramBase;


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