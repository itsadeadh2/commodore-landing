import Terminal from "../terminal";
import Command from "../command"
import { ReactElement } from "react";


export type setProgramCB = (programName: string, command?: Command) => Promise<void>;


export interface ProgramBase {
    handle(command: Command): Promise<void>
    get entrypoint(): string
    get help(): string | ReactElement
}

export abstract class BaseProgram implements ProgramBase {
    protected terminal: Terminal;
    protected setProgram: setProgramCB

    constructor(terminal: Terminal, setProgram: setProgramCB) {
        this.terminal = terminal;
        this.setProgram = setProgram
    }

    async handle(command: Command): Promise<void> {}

    get entrypoint(): string {
        throw new Error('Entrypoint not defined!')
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - Not implemented yet`
    }
}