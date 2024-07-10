import Command from "../../../command";
import {StateHandler} from "./baseState";
import {EHangmanState} from "../enums";

export default class LeaderboardHandler extends StateHandler {
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