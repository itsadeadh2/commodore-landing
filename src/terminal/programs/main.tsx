import {BaseClass, Program} from "./program"
import Command from "../command";
import Help from './help'

export default class Main extends BaseClass {

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

    registerEntryPoint(program: Program): void {
        this.entrypointMapping.set(program.entrypoint, program.constructor.name);
    }
}