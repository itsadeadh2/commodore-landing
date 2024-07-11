import {BaseProgram} from "./program.base"
import Command from "../command";
import {ReactElement} from "react";
import Main from "./main";

export default class About extends BaseProgram {

    async handle(command: Command): Promise<void> {
        this.terminal.print(`> ${command.original}`)

        const response = [
            'Name: Thiago Barbosa da Silva',
            'Experience: 7+ Years',
            'Stack: NodeJS, Python, GoLang, React',
            'Additional Tools: Docker, AWS, DEVOPS',
            'Hobbies: Playing retro games',
            (<span>Linkedin: <a href={"https://www.linkedin.com/in/barbosathiagodev/"} target={"_blank"} rel={"noreferrer"}>Thiago Barbosa</a></span>)
        ]
        response.forEach((entry) => this.terminal.print(entry))
        await this.setProgram(Main.name)
    }

    get entrypoint(): string {
        return 'about';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - about me`
    }
}