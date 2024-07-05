import {COMMAND_STATUS, CommandResult, BaseHandler} from '.'

export default class AboutHandler extends BaseHandler{
  static context = 'about'

  async handle(action){
    return new CommandResult(
      COMMAND_STATUS.SUCCESS,
      [
        'Name: Thiago Barbosa da Silva',
        'Experience: 7+ Years',
        'Stack: NodeJS, Python, GoLang, React',
        'Additional Tools: Docker, AWS, DEVOPS',
        'Hobbies: Playing retro games',
        (<span>Linkedin: <a href={"https://www.linkedin.com/in/barbosathiagodev/"} target={"_blank"} rel={"noreferrer"}>Thiago Barbosa</a></span>)
      ]
    )
  }

  static help() {
    return 'about - about me'
  }
}