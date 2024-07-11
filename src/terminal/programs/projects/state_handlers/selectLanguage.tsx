import {setStateFn, StateHandler} from "../../state.base";
import Terminal from "../../../terminal";
import Command from "../../../command";
import {EProjectState, project } from "../types";
import {ReactElement} from "react";
import {AxiosInstance} from "axios";

enum idleActions  {
    node = 'node',
    python = 'python',
    bash = 'bash',
    all = 'all',
    exit = 'exit',
    empty = 'projects'
}

export default class SelectLanguageHandler extends StateHandler {
    private http: AxiosInstance;

    constructor(terminal: Terminal, setState: setStateFn, http: AxiosInstance) {
        super(terminal, setState);
        this.http = http;
    }

    onEnter = async () => {
        this.intro()
    }

    private getProjects = async (language: string = '') => {
        const {data} = await this.http.get(`/api/projects?language=${language}`)
        return data as project[];
    }

    private renderProjects = (projects: project[]) => {
        projects.forEach((project) => {
            const element: ReactElement = (
                <span>
                    <strong>Name</strong>: {project.name} <br/>
                    <strong>Description</strong>: {project.description} <br/>
                    <strong>Stack</strong>: {project.stack} <br/>
                    <strong>Language</strong>: {project.language} <br/>
                    <strong>Links</strong>:
                    {!!project.github_link && <a href={project.github_link} target={"_blank"} rel={"noreferrer"}>GitHub</a>}
                    {!!project.docs_link && <a href={project.docs_link} target={"_blank"} rel={"noreferrer"}>, Docussaurus</a>}
                </span>
            )
            this.terminal.print(element)
            this.terminal.print((<span><br/></span>))
        })
    }

    private intro = () => {
        this.terminal.clear()
        this.terminal.print("PROJECTS")
        this.terminal.print("node - See NodeJS projects")
        this.terminal.print("python - See python projects")
        this.terminal.print("bash - See bash scripting projects")
        this.terminal.print("all - See all projects")
        this.terminal.print("exit - Go back to the main menu")
        this.terminal.print("Type your option and press enter.")
    }

    private displayProjectsFor = async (option: string) => {
        this.terminal.clear()
        const projects = await this.getProjects(option)
        this.renderProjects(projects)
        await this.setState(EProjectState.ViewResults)
    }

    private unrecognizedCommand = () => {
        this.terminal.print("Unrecognized command.")
    }


    handle = async (command: Command) => {
        const action = command.root;
        switch (action) {
            case idleActions.empty:
                this.intro()
                break;
            case idleActions.exit:
                await this.setState(EProjectState.ExitProjects)
                break;
            case idleActions.node:
                await this.displayProjectsFor(action)
                break;
            case idleActions.python:
                await this.displayProjectsFor(action)
                break;
            case idleActions.bash:
                await this.displayProjectsFor(action)
                break;
            case idleActions.all:
                await this.displayProjectsFor('')
                break;
            default:
                this.unrecognizedCommand()
                break;
        }
    }
}