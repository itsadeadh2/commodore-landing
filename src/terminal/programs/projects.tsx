import { BaseClass } from "./program"
import Command from "../command";
import Main from './main'


export default class Projects extends BaseClass {


    async handle(command: Command): Promise<void> {
        this.terminal.print(`> ${command.original}`)
        this.terminal.print(`> This command has not been implemented yet`)
        await this.setProgram(Main.name)
    }

    get entrypoint(): string {
        return 'projects';
    }
}