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
            (<span>Resume: <a href="https://resume.itsadeadh2.com" target="_blank" rel="noreferrer">https://resume.itsadeadh2.com</a></span>),
            (<br/>),
            (<span>For contact information, use <strong>"contact youremail@email.com"</strong></span>),
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