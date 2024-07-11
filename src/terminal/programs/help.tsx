import {BaseProgram, ProgramBase} from "./program.base"
import Command from "../command";
import Main from './main'
import {ReactElement} from "react";

export default class Help extends BaseProgram {

    private helpEntries: (string | ReactElement)[] = [];
    async handle(command: Command): Promise<void> {
        this.terminal.print(`> ${command.original}`)
        this.helpEntries.forEach((helpText) => {
            this.terminal.print(helpText);
        })
        await this.setProgram(Main.name)
    }

    get entrypoint(): string {
        return 'help';
    }

    registerHelp(program: ProgramBase) {
        this.helpEntries.push(program.help);
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - see help messages for available commands`
    }

}