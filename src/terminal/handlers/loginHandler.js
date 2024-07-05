import {COMMAND_STATUS, CommandResult, BaseHandler} from '.'

export default class LoginHandler extends BaseHandler{

    static context = 'login'

    async handle(command){
        const result = super.handle(command);
        if (result) return result;

        return new CommandResult(
            COMMAND_STATUS.SUCCESS,
            [(<span>Click <a href={process.env['REACT_APP_API_URL']+'/login'} target={"_blank"} rel={"noreferrer"}>here</a> to login/register with google.</span>)]
        )
    }

    static help(command) {
        return `login - login/register to use additional options`
    }
}