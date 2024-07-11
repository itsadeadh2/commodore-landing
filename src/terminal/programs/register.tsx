import {BaseProgram, setProgramCB} from "./program.base"
import Command from "../command";
import {ReactElement} from "react";
import Main from "./main";
import utils from "./utils"
import Terminal from "../terminal";
import axios, {AxiosInstance} from "axios";

enum registerSteps {
    Idle = 0,
    WaitingForEmail = 1,
    WaitingForName = 2,
    WaitingForPassword = 3,
    WaitingForConfirmation = 4
}

export default class Register extends BaseProgram {

    private http: AxiosInstance;
    private givenName: string = "";
    private givenEmail: string = "";
    private givenPassword: string = "";
    private currentStep: registerSteps = registerSteps.Idle;

    constructor(terminal: Terminal, setProgram: setProgramCB, http: AxiosInstance) {
        super(terminal, setProgram);
        this.http = http;
    }

    private resetProgram() {
        this.givenEmail = ""
        this.givenName = ""
        this.givenPassword = ""
        this.currentStep = registerSteps.Idle
    }

    private askForEmail() {
        this.terminal.print('Please input your email:')
        this.currentStep = registerSteps.WaitingForEmail
    }

    private askForName() {
        this.terminal.print('Please input your name:')
        this.currentStep = registerSteps.WaitingForName
    }

    private askForPassword() {
        this.terminal.print('Please input your password:')
        this.currentStep = registerSteps.WaitingForPassword
    }

    private askForConfirmation() {
        const result = [
            "You'll register with the following data:",
            `email: ${this.givenEmail}`,
            `name: ${this.givenEmail}`,
            "Type 'y' to confirm, or 'n' to cancel."
        ]
        result.forEach((entry) => this.terminal.print(entry))
        this.currentStep = registerSteps.WaitingForConfirmation;
    }

    private saveEmail(email: string) {
        if (!utils.isValidEmail(email)) {
            this.terminal.print("* Invalid email *")
            this.askForEmail()
            return;
        }
        this.givenEmail = email;
        this.askForName()
    }

    private saveName(name: string) {
        this.givenName = name;
        this.askForPassword()
    }

    private savePassword(password: string) {
        this.givenPassword = password;
        this.askForConfirmation()
    }

    private async confirmData(confirmation: string) {
        if (!utils.isYes(confirmation)) {
            this.terminal.print("Aborted.")
            this.resetProgram();
            await this.setProgram(Main.name);
            return
        }
        try {
            await this.http.post('/api/user/register', {
                name: this.givenName,
                email: this.givenEmail,
                password: this.givenPassword
            })
            this.terminal.print("Successfully registered")
            await this.setProgram(Main.name);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 409) {
                    this.terminal.print('The email you provided is already in use.')
                    this.resetProgram()
                    await this.setProgram(Main.name);
                    return;
                } else {
                    this.terminal.print('There was an issue while registering. Please try again later.')
                    this.resetProgram()
                    await this.setProgram(Main.name);
                    return;
                }
            }
        }
    }

    async handle(command: Command): Promise<void> {
        this.terminal.print(`> ${command.original}`)

        if (this.currentStep !== registerSteps.Idle && !command.root) {
            this.terminal.print("Please provide a value.")
            return;
        }

        switch (this.currentStep) {
            case registerSteps.Idle:
                this.askForEmail()
                break;

            case registerSteps.WaitingForEmail:
                this.saveEmail(command.original)
                break;

            case registerSteps.WaitingForName:
                this.saveName(command.original)
                break;

            case registerSteps.WaitingForPassword:
                this.savePassword(command.root)
                break;
            case registerSteps.WaitingForConfirmation:
                await this.confirmData(command.root)
                break;
        }
    }

    get entrypoint(): string {
        return 'register';
    }

    get help(): string | ReactElement {
        return `${this.entrypoint} - register to unlock additional functionalities`
    }
}