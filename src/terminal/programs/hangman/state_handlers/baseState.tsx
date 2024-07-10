import Command from "../../../command";
import {EHangmanState} from "../enums";
import Terminal from "../../../terminal";
import HangmanApi from "../hangmanApi";

export type setStateFn = (state: EHangmanState) => Promise<void>;

export type GameData = {
    attempts_left: string,
    masked_word: string,
    status: string
    id: string,
}

export type ScoreData = {
    name: string,
    score: number
}

export interface IStateHandler {
    handle(command: Command): Promise<void>
    onEnter(): Promise<void>
}

export class StateHandler implements IStateHandler {
    protected terminal: Terminal;
    protected api: HangmanApi;
    protected readonly setState: setStateFn;

    constructor(terminal: Terminal, api: HangmanApi, setState: setStateFn) {
        this.terminal = terminal;
        this.api = api
        this.setState = setState
    }

    onEnter = async ()=> {}

    handle = async (command: Command)=> {}

}