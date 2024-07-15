import Command from "../../../command";
import {EHangmanState} from "../types";
import {setStateFn, StateHandler} from "../../state.base";
import Terminal from "../../../terminal";
import HangmanApi from "../hangmanApi";

enum idleActions {
    empty = 'hangman',
    start = 'start',
    continue = 'continue',
    leaderboard = 'leaderboard',
    exit = 'exit'
}

export default class IdleHandler extends StateHandler {
    private enableContinue: boolean = false;
    private api: HangmanApi;

    constructor(terminal: Terminal, api: HangmanApi, setState: setStateFn) {
        super(terminal, setState)
        this.api = api
    }

    onEnter = async () => {
        await this.intro()
    }

    private generalError = () => {
        this.terminal.print("There was an issue, please try again later.")
    }

    private instructions = () => {
        this.terminal.print("Available commands: ")
        if (this.enableContinue) {
            this.terminal.print("continue - resume previous game")
        }
        this.terminal.print("start - start a new game")
        this.terminal.print("leaderboard - see the leaderboard for this game")
        this.terminal.print("exit - go back to main menu")
    }

    private checkExistingGame = async () => {
        try {
            const games = await this.api.retrieveInProgressGames();
            if (games.length < 1) {
                this.enableContinue = false;
                return;
            }
            localStorage.setItem('hangmanCurrentGameId', games[0].id)
            this.enableContinue = true;
            return;
        } catch(error) {
            this.enableContinue = false;
            return;
        }
    }

    private intro = async () => {
        this.terminal.clear()
        await this.checkExistingGame()
        this.terminal.print("HANGMAN")
        this.instructions()
    }

    private startGame = async () => {
        this.terminal.print("Generating new game...")
        const gameData = await this.api.createGame();
        const gameId = gameData.id;
        if (gameId) {
            localStorage.setItem('hangmanCurrentGameId', gameId);
            this.terminal.print("Game created!")
            await this.setState(EHangmanState.InProgress)
        } else {
            this.generalError()
            await this.setState(EHangmanState.ExitGame)
        }
    }

    private continueGame = async () => {
        await this.setState(EHangmanState.InProgress)
    }

    private exitGame = async () => {
        await this.setState(EHangmanState.ExitGame)
    }

    private showLeaderBoard = async () => {
        await this.setState(EHangmanState.LeaderBoard)
    }

    private unrecognizedCommand = () => {
        this.terminal.print("Unrecognized command.")
        this.instructions()
    }

    handle = async (command: Command) => {
        const action = command.root;
        switch (action) {
            case idleActions.empty:
                await this.intro()
                break;
            case idleActions.start:
                await this.startGame()
                break;
            case idleActions.exit:
                await this.exitGame()
                break;
            case idleActions.continue:
                await this.continueGame()
                break;
            case idleActions.leaderboard:
                await this.showLeaderBoard()
                break;
            default:
                this.unrecognizedCommand()
                break;
        }
    }
}