import Command from "../../../command";
import {EHangmanState} from "../types";
import {setStateFn, StateHandler} from "../../state.base";
import Terminal from "../../../terminal";
import HangmanApi from "../hangmanApi";


export default class LeaderboardHandler extends StateHandler {
    private api: HangmanApi;

    constructor(terminal: Terminal, api: HangmanApi, setState: setStateFn) {
        super(terminal, setState)
        this.api = api
    }
    
    onEnter = async () => {
        const scores = await this.api.getLeaderBoard();
        this.terminal.clear()
        scores.forEach((score) => {
            this.terminal.print(`${score.name} - ${score.score}`)
        })
        this.terminal.print("Type anything to continue")
        return;
    }

    handle = async (command: Command) => {
        await this.setState(EHangmanState.Idle);
    }

}