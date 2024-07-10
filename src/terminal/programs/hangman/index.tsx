import {BaseClass, setProgramCB} from "../program"
import Command from "../../command";
import {ReactElement} from "react";
import Terminal from "../../terminal";
import {AxiosInstance} from "axios";
import {IStateHandler} from "./state_handlers/baseState";
import {EHangmanState} from "./enums";
import IdleHandler from "./state_handlers/idle";
import Main from "../main";
import InProgressHandler from "./state_handlers/inProgress";
import HangmanApi, {AuthenticationError} from "./hangmanApi";
import GameOverHandler from "./state_handlers/gameOver";
import LeaderboardHandler from "./state_handlers/leaderboard";


export default class Index extends BaseClass {
    private readonly http: AxiosInstance;
    private states: Map<EHangmanState, IStateHandler>;
    private currentState: IStateHandler;
    private defaultState: IStateHandler;

    constructor(terminal: Terminal, setProgram: setProgramCB, http: AxiosInstance) {
        super(terminal, setProgram);
        this.http = http;
        this.states = new Map();
        const hangmanApi = new HangmanApi(this.http);
        const idleState = new IdleHandler(this.terminal, hangmanApi, this.setState)
        const inProgressState = new InProgressHandler(this.terminal, hangmanApi, this.setState)
        const gameOverState = new GameOverHandler(this.terminal, hangmanApi, this.setState)
        const leaderBoardState = new LeaderboardHandler(this.terminal, hangmanApi, this.setState)

        this.defaultState = idleState;
        this.currentState = idleState;
        this.states.set(EHangmanState.Idle, idleState);
        this.states.set(EHangmanState.InProgress, inProgressState)
        this.states.set(EHangmanState.GameOver, gameOverState)
        this.states.set(EHangmanState.LeaderBoard, leaderBoardState)
    }

    private setState = async (state: EHangmanState) => {
        if (state === EHangmanState.ExitGame) {
            this.terminal.print("Exiting game.")

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
            if (error instanceof AuthenticationError) {
                this.terminal.print("This game is for registered users only.")
                this.terminal.print("If you already have an account type 'login' to log in")
                this.terminal.print("If you want to register, type 'register'")
                await this.setProgram(Main.name);
                return;
            }
            this.terminal.print("There was an issue, please try again later.")
            await this.setProgram(Main.name);
        }
    }

    get entrypoint(): string {
        return 'hangman';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - hangman game (WIP)`
    }
}