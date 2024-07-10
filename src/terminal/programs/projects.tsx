import { BaseClass } from "./program"
import Command from "../command";
import Main from './main'
import {ReactElement} from "react";

type project = {
    name: string,
    description: string,
    link: string,
    docs?: string
}

export default class Projects extends BaseClass {


    async handle(command: Command): Promise<void> {
        this.terminal.clear()
        this.terminal.print("Click on the links to see more details")
        const projects: project[] = [
            {
                name: 'Commodore',
                description: 'This project (frontend)',
                link: 'https://github.com/itsadeadh2/commodore-landing',
                docs: 'https://itsadeadh2.github.io/commodore-docs/'
            },
            {
                name: 'itsanapi',
                description: 'REST API made with flask, also used in this project',
                link: 'https://github.com/itsadeadh2/itsanapi',
                docs: 'https://itsadeadh2.github.io/commodore-docs/category/rest-api'
            },
            {
                name: 'Email Sender',
                description: 'Worker that sends emails using mailgun',
                link: 'https://github.com/itsadeadh2/email-sender-worker',
                docs: 'https://itsadeadh2.github.io/commodore-docs/category/workers'
            },
            {
                name: 'API Gateway',
                description: 'Simple api gateway made with node/express',
                link: 'https://github.com/itsadeadh2/api-gateway'
            },
            {
                name: 'Astaroth2',
                description: 'Youtube reports generator',
                link: 'https://github.com/itsadeadh2/astaroth2'
            },
            {
                name: 'PAT CLI',
                description: 'Add docstrings to python using Chat GPT',
                link: 'https://github.com/itsadeadh2/pat'
            },
            {
                name: 'Luna CLI',
                description: 'Synchronize files using S3',
                link: 'https://github.com/itsadeadh2/luna-cli'
            },
            {
                name: 'Syncthing Setups',
                description: 'Collection of syncthing convenience scripts for handheld devices',
                link: 'https://github.com/itsadeadh2/syncthing-setups'
            },
            {
                name: 'Batocera FileBrowser',
                description: 'Add FileBrowser to Batocera',
                link: 'https://github.com/itsadeadh2/batocera-filebrowser'
            },
        ]
        projects.forEach((project) => {
            const element: ReactElement = (
                <span>
                    <a href={project.link} target={"_blank"} rel={"noreferrer"}>{project.name}</a>: {project.description} <br/>
                    {!!project.docs && <a href={project.docs} target={"_blank"} rel={"noreferrer"}>See docs</a> }
                </span>
            )
            this.terminal.print(element)
            this.terminal.print((<span><br/></span>))
        })
        await this.setProgram(Main.name)
    }

    get entrypoint(): string {
        return 'projects';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - see my pet projects`
    }
}