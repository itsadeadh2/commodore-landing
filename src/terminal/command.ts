export default class Command {
    private readonly _root: string;
    private readonly _params?: string[];
    private readonly _original: string;

    constructor(command: string) {
        this._original = command;
        const normalizedCommand = Command.normalizeCommand(command);
        const commandParts = normalizedCommand.split(' ');

        this._root = commandParts[0];
        if (commandParts.length > 1) {
            this._params = commandParts.slice(1);
        }
    }

    get root(): string {
        return this._root;
    }

    get params(): string[] | undefined {
        return this._params;
    }

    get original(): string {
        return this._original;
    }

    static normalizeCommand(command: string): string {
        return command.trim().toLowerCase();
    }
}
