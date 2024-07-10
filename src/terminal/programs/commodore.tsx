import {BaseClass} from "./program"
import Command from "../command";
import {ReactElement} from "react";
import Main from "./main";

export default class Commodore extends BaseClass {

    async handle(command: Command): Promise<void> {
        this.terminal.print(`> ${command.original}`)

        const response = [
            '** Commodore Landing **',
            '-',
            (
                <span>
            This project doesn't just look A E S T H E T I C, it's also a full-fledged system.
            Behind this simple page, Commodore Landing uses a REST API and a bunch of services like workers,
            queues, and lambda functions to give you this awesome experience.
            All the services are deployed on AWS and you can check them out on my GitHub.
            If you want more details, just click <a href="https://itsadeadh2.github.io/commodore-docs" target="_blank" rel="noreferrer">here.</a>
          </span>
            ),
            '-',
            'See ya!'
        ]
        response.forEach((entry) => this.terminal.print(entry))
        await this.setProgram(Main.name)
    }

    get entrypoint(): string {
        return 'commodore';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - see more information about this terminal`
    }
}