import {BaseClass} from "./program"
import Command from "../command";
import {ReactElement} from "react";
import Main from "./main";

export default class Register extends BaseClass {

    async handle(command: Command): Promise<void> {
        this.terminal.print(`> ${command.original}`)
        this.terminal.print(`> This command has not been implemented yet`)
        await this.setProgram(Main.name)
    }

    get entrypoint(): string {
        return 'register';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - register to unlock additional functionalities`
    }
}