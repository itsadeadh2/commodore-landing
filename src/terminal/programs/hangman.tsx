import {BaseClass, setProgramCB} from "./program"
import Command from "../command";
import {ReactElement} from "react";
import Main from "./main";
import Terminal from "../terminal";
import {AxiosInstance} from "axios";

export default class Hangman extends BaseClass {
    private http: AxiosInstance;

    constructor(terminal: Terminal, setProgram: setProgramCB, http: AxiosInstance) {
        super(terminal, setProgram);
        this.http = http;
    }

    async handle(command: Command): Promise<void> {
        this.terminal.print(`> ${command.original}`)
        try {
            await this.http.get('/api/games/hangman')
            const { data } = await this.http.post('/api/games/hangman')
            console.log('Created game: ', data);
            await this.setProgram(Main.name)
        } catch (error) {
            console.error(error);
            this.terminal.print(`> there was an error`)
            await this.setProgram(Main.name)
        }
    }

    get entrypoint(): string {
        return 'hangman';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - hangman game (WIP)`
    }
}