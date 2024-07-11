import {BaseProgram, setProgramCB} from "../program.base"
import Command from "../../command";
import Main from '../main'
import {ReactElement} from "react";
import {AxiosInstance} from "axios";
import Terminal from "../../terminal";
import {IStateHandler} from "../state.base";
import SelectLanguageHandler from "./state_handlers/selectLanguage";
import ViewResultHandler from "./state_handlers/viewResult";
import {EProjectState} from "./types";

export default class Projects extends BaseProgram {

    private states: Map<EProjectState, IStateHandler>;
    private currentState: IStateHandler;
    private readonly defaultState: IStateHandler;


    constructor(terminal: Terminal, setProgram: setProgramCB, http: AxiosInstance) {
        super(terminal, setProgram);
        this.states = new Map();

        const selectLanguageState = new SelectLanguageHandler(this.terminal, this.setState, http)
        const viewResultState = new ViewResultHandler(this.terminal, this.setState)

        this.defaultState = selectLanguageState;
        this.currentState = selectLanguageState;
        this.states.set(EProjectState.SelectLanguage, selectLanguageState);
        this.states.set(EProjectState.ViewResults, viewResultState)
    }

    private setState = async (state: number) => {
        if (state === EProjectState.ExitProjects) {
            this.terminal.print("Exiting.")

            this.currentState = this.defaultState;
            await this.setProgram(Main.name);
            return;
        }
        const newState = this.states.get(state);
        if (newState) {
            this.currentState = newState;
            await this.currentState.onEnter();
            return;
        }
        this.terminal.print("The state you are looking for is not yet implemented.")
    }

    async handle(command: Command): Promise<void> {
        this.terminal.print(`> ${command.original}`)
        try {
            await this.currentState.handle(command)
        } catch (error) {
            this.terminal.print("There was an issue, please try again later.")
            await this.setProgram(Main.name);
        }
    }

    get entrypoint(): string {
        return 'projects';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - see my pet projects`
    }
}