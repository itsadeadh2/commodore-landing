import {BaseProgram} from "./program.base"
import Command from "../command";
import {ReactElement} from "react";
import Main from "./main";

export default class Clear extends BaseProgram {

    async handle(command: Command): Promise<void> {
        this.terminal.clear()
        await this.setProgram(Main.name)
    }

    get entrypoint(): string {
        return 'clear';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - Clear the screen content`
    }
}