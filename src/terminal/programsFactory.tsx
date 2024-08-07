import Terminal from "./terminal";
import Main from "./programs/main"
import Help from "./programs/help"
import Projects from "./programs/projects"
import Clear from "./programs/clear"
import About from "./programs/about"
import Commodore from "./programs/commodore"
import Contact from "./programs/contact"
import Login from "./programs/login";
import Register from "./programs/register";
import Hangman from "./programs/hangman"
import { ProgramBase, setProgramCB } from "./programs/program.base";
import axiosInstance from '../clients/http'

export default class ProgramsFactory {
    private readonly terminal: Terminal;
    private readonly _programs: Map<string, ProgramBase>;

    private readonly _defaultProgram: Main;
    private readonly helpProgram: Help;

    constructor(terminal: Terminal, setProgram: setProgramCB) {
        this.terminal = terminal;
        this._programs = new Map()

        this._defaultProgram = new Main(this.terminal, setProgram);
        this.helpProgram = new Help(this.terminal, setProgram);

        this.registerProgram(new Contact(this.terminal, setProgram, axiosInstance))
        this.registerProgram(new Hangman(this.terminal, setProgram, axiosInstance))
        this.registerProgram(new About(this.terminal, setProgram))
        this.registerProgram(new Login(this.terminal, setProgram, axiosInstance))
        this.registerProgram(new Register(this.terminal, setProgram, axiosInstance))
        this.registerProgram(new Clear(this.terminal, setProgram))
        this.registerProgram(new Commodore(this.terminal, setProgram))
        this.registerProgram(new Projects(this.terminal, setProgram, axiosInstance))
        this.registerProgram(new Hangman(this.terminal, setProgram, axiosInstance))
        this.registerProgram(this.helpProgram);
    }

    private registerProgram(program: ProgramBase): void {
        this._defaultProgram.registerEntryPoint(program);
        this.helpProgram.registerHelp(program);
        this._programs.set(program.constructor.name, program);
    }

    get default(): ProgramBase {
        return this._defaultProgram
    }

    get programs(): Map<string, ProgramBase> {
        return this._programs;
    }

}