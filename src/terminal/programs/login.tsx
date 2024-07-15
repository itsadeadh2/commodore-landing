import {BaseProgram, setProgramCB} from "./program.base"
import Command from "../command";
import {ReactElement} from "react";
import Main from "./main";
import {AxiosInstance} from "axios";
import Terminal from "../terminal";
import utils from "./utils";

enum loginSteps {
    Idle = 0,
    WaitingForEmail,
    WaitingForPassword
}

export default class Login extends BaseProgram {

    private http: AxiosInstance;
    private givenEmail: string = "";
    private givenPassword: string = "";
    private currentStep: loginSteps = loginSteps.Idle;

    constructor(terminal: Terminal, setProgram: setProgramCB, http: AxiosInstance) {
        super(terminal, setProgram);
        this.http = http;
    }

    private async retrieveCsrf() {
        try {
            await this.http.get('/login/csrf/')
            return true
        } catch (err) {
            return false
        }
    }

    private askForEmail() {
        this.terminal.print('Please input your email:')
        this.currentStep = loginSteps.WaitingForEmail
    }

    private askForPassword() {
        this.terminal.print('Please input your password:')
        this.currentStep = loginSteps.WaitingForPassword
    }

    private saveEmail(email: string) {
        if (!utils.isValidEmail(email)) {
            this.terminal.print("* Invalid email *")
            this.askForEmail()
            return;
        }
        this.givenEmail = email;
        this.askForPassword()
    }

    private resetProgram = () => {
        this.givenEmail = ""
        this.givenPassword = ""
        this.currentStep = loginSteps.Idle
    }

    private attemptLogin = async (password: string) => {
        this.givenPassword = password
        try {
            await this.http.post('/login/csrf/', {
                email: this.givenEmail,
                password: this.givenPassword
            })
            this.terminal.print("login successful")
        } catch (error) {
            this.terminal.print("login failure")
            this.terminal.print("check your credentials and try again")
        }
        this.resetProgram()
        await this.setProgram(Main.name)
    }

    async handle(command: Command): Promise<void> {
        this.terminal.print(`> ${command.original}`)

        if (this.currentStep !== loginSteps.Idle && !command.root) {
            this.terminal.print("Please provide a value.")
            return;
        }

        switch (this.currentStep) {
            case loginSteps.Idle:
                const csrfRetrieved = await this.retrieveCsrf()
                if (!csrfRetrieved) {
                    this.terminal.print("Failed to connect to backend service. Please try again later.")
                    return await this.setProgram(Main.name)
                }
                this.askForEmail()
                break;

            case loginSteps.WaitingForEmail:
                this.saveEmail(command.original)
                break;

            case loginSteps.WaitingForPassword:
                await this.attemptLogin(command.original)
                break;
        }
    }

    get entrypoint(): string {
        return 'login';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - log in with your credentials`
    }
}