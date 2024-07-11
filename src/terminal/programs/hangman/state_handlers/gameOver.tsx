import Command from "../../../command";
import {EHangmanState, GameStates} from "../types";
import {setStateFn, StateHandler} from "../../state.base";
import Terminal from "../../../terminal";
import HangmanApi from "../hangmanApi";

enum GameOverActions {
    exit = 'exit'
}

export default class GameOverHandler extends StateHandler {
    private api: HangmanApi;

    constructor(terminal: Terminal, api: HangmanApi, setState: setStateFn) {
        super(terminal, setState)
        this.api = api
    }

    onEnter = async () => {
        const gameId = localStorage.getItem('hangmanCurrentGameId');
        if (!gameId) {
            await this.setState(EHangmanState.Idle);
            return;
        }
        const game = await this.api.retrieveGame(gameId)
        if (game.status === GameStates.GameLost) {
            this.terminal.print("You lost!")
            this.terminal.print("Press enter to try again, or type 'exit' to exit the game")
            return;
        }
        if (game.status === GameStates.GameWon) {
            this.terminal.print("You won!")
            this.terminal.print("Press enter to try again, or type 'exit' to exit the game")
            return
        }
        await this.setState(EHangmanState.Idle);
        return;
    }

    handle = async (command: Command) => {
        const action = command.root;
        switch (action) {
            case GameOverActions.exit:
                await this.setState(EHangmanState.ExitGame)
                break;
            default:
                await this.setState(EHangmanState.Idle)
                break;
        }
    }

}