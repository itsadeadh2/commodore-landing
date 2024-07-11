import {BaseProgram, ProgramBase} from "./program.base"
import Command from "../command";

export default class Main extends BaseProgram {

    private entrypointMapping: Map<string, string> = new Map();

    async handle(command: Command): Promise<void> {
        const programName = this.entrypointMapping.get(command.root);
        if (programName) {
            await this.setProgram(programName, command);
            return;
        }
        this.terminal.print(`> ${command.original}`)
        this.terminal.print(`> Unrecognized command "${command.original}"`)
        return;
    }

    registerEntryPoint(program: ProgramBase): void {
        this.entrypointMapping.set(program.entrypoint, program.constructor.name);
    }
}