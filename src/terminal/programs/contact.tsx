import {BaseClass, setProgramCB} from "./program"
import Command from "../command";
import {ReactElement} from "react";
import Main from "./main";
import Terminal from "../terminal";
import {AxiosInstance} from "axios";

export default class Contact extends BaseClass {
    private http: AxiosInstance;

    constructor(terminal: Terminal, setProgram: setProgramCB, http: AxiosInstance) {
        super(terminal, setProgram);
        this.http = http;
    }

    handleEmptyAction() {
        const result = [
            'Here is my basic contact information:',
            (<span>E-Mail: <a href="mailto:itsadeadh2@gmail.com">itsadeadh2@gmail.com</a></span>),
            (<span>GitHub: <a href="https://github.com/itsadeadh2" target="_blank" rel="noreferrer">https://github.com/itsadeadh2</a></span>),
            (<span>LinkedIn: <a href="https://www.linkedin.com/in/barbosathiagodev/" target="_blank" rel="noreferrer">https://www.linkedin.com/in/barbosathiagodev/</a></span>),
            (<br/>),
            (<span>For more information, such as WhatsApp and Resume, please use <strong>"contact youremail@email.com"</strong></span>),
        ]
        result.forEach((entry) => this.terminal.print(entry));
    }

    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    async handleEmailProvided(email: string) {
        if (!this.isValidEmail(email)) {
            this.terminal.print("Invalid email.")
            return;
        }
        try {
            const { data } = await this.http.post('/api/contact', {
                email: email
            })
            console.log('not Catched!')
            this.terminal.print('foobaz')
        } catch (error) {
            console.log('Catched!')
            this.terminal.print('There was an error when requesting contact information. Please try again later.')
            return;
        }
    }

    async handle(command: Command): Promise<void> {
        this.terminal.print(`> ${command.original}`)
        if (!command.params) {
            this.handleEmptyAction()
            await this.setProgram(Main.name)
            return;
        }
        await this.handleEmailProvided(command.params[0])
        await this.setProgram(Main.name)
    }

    get entrypoint(): string {
        return 'contact';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - get in touch`
    }
}