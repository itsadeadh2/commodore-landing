import {StateHandler} from "../../state.base";
import Command from "../../../command";
import {EProjectState } from "../types";


export default class ViewResultHandler extends StateHandler {



    onEnter = async () => {
        this.terminal.print("Type anything to continue")
    }

    handle = async (command: Command) => {
        await this.setState(EProjectState.SelectLanguage)
    }
}