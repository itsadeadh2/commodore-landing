import Command from "../command";
import Terminal from "../terminal";

export type setStateFn = (state: number) => Promise<void>;

export interface IStateHandler {
    handle(command: Command): Promise<void>
    onEnter(): Promise<void>
}

export abstract class StateHandler implements IStateHandler {
    protected terminal: Terminal;
    protected readonly setState: setStateFn;

    constructor(terminal: Terminal, setState: setStateFn) {
        this.terminal = terminal;
        this.setState = setState
    }

    onEnter = async ()=> {}

    handle = async (command: Command)=> {}

}