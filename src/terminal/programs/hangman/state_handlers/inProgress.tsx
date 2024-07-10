import Command from "../../../command";
import {GameData, StateHandler} from "./baseState";
import {EHangmanState, GameStates} from "../enums";

enum InProgressActions {
    empty = '',
    guess = 'guess',
    exit = 'exit'
}

export default class InProgressHandler extends StateHandler {
    private gameId: string = '';
    private gameData: GameData = { attempts_left:'', status:'', masked_word:'', id:'' };

    onEnter = async () => {
        const gameId = localStorage.getItem('hangmanCurrentGameId')
        if (!gameId) {
            this.generalError()
            await this.setState(EHangmanState.ExitGame);
            return
        }
        this.terminal.clear()
        this.gameId = gameId;
        await this.retrieveGame()
        this.renderGame()
    }

    private generalError = () => {
        this.terminal.print("There was an issue, please try again later.")
    }

    private instructions = () => {
        this.terminal.print("Type 'guess <letter>' to guess a letter")
        this.terminal.print("Type 'exit' at any moment to exit the game. Don't worry, you can get back to it later.")
    }

    private unrecognizedCommand = () => {
        this.terminal.print("Unrecognized command.")
        this.instructions()
    }

    private renderGame = () => {
        this.terminal.clear()
        this.terminal.print(`Current word: ${this.gameData.masked_word}`)
        this.terminal.print(`Attempts left: ${this.gameData.attempts_left}`)
        this.instructions()
    }

    private retrieveGame = async () => {
        try {
            this.gameData = await this.api.retrieveGame(this.gameId);
        } catch (error) {
            this.generalError()
            await this.setState(EHangmanState.ExitGame)
            return;
        }
    }

    private handleGuessResponse = async () => {
        if (this.gameData.status !== GameStates.InProgress) {
            await this.setState(EHangmanState.GameOver)
            return;
        }
        this.renderGame()
    }

    private takeGuess = async (guess: string) => {
        if (!guess) {
            this.terminal.print("You need to provide a guess letter. E.g: 'guess a'")
            return;
        }
        if (guess.length > 1) {
            this.terminal.print("You can only guess one letter at a time.")
            return;
        }
        try {
            this.gameData = await this.api.takeGuess(this.gameId, guess)
            await this.handleGuessResponse()
        } catch (error) {
            this.generalError()
            await this.setState(EHangmanState.ExitGame)
            return;
        }
    }

    private exitGame = async () => {
        await this.setState(EHangmanState.ExitGame)
    }



    handle = async (command: Command) => {
        const action = command.root;
        let guess = ''
        if (command.params) {
            guess = command.params[0];
        }
        switch (action) {
            case InProgressActions.guess:
                await this.takeGuess(guess)
                break;
            case InProgressActions.exit:
                await this.exitGame()
                break;
            default:
                this.unrecognizedCommand()
                break;
        }
    }

}