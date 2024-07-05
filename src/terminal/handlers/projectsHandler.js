import {COMMAND_STATUS, CommandResult, BaseHandler} from '.'

export default class ProjectsHandler extends BaseHandler{
  static context = 'projects'

  async handle(command){
    const result = super.handle(command);
    if (result) return result;

    return new CommandResult(
      COMMAND_STATUS.SUCCESS,
      ['This command has not been implemented yet']
    )
  }

  static help() {
    return 'projects - see the projects I have created'
  }
}