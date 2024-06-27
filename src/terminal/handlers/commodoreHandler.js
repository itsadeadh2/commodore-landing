import {COMMAND_STATUS, CommandResult, BaseHandler} from '.'

export default class CommodoreHandler extends BaseHandler{
  async handle(command){
    const result = super.handle(command);
    if (result) return result;

    return new CommandResult(
      COMMAND_STATUS.SUCCESS,
      [
        '** Commodore Landing **',
        '-',
        (<span>Besides looking A E S T H E T I C, this project is also a full blown microservices system. Behind the simplicity of this page, Commodore Landing makes use of an API Gateway and multiple other services such as workers, REST APIs, queues and lambda functions to deliver the experience you're having (pretty cool huh?) All the services are deployed on AWS and available in my GitHub, and if you want more details just click <a href={"https://itsadeadh2.github.io/commodore-docs"} target={"_blank"} rel={"noreferrer"}>here.</a></span>),
        '-',
        'See ya'
      ]
    )
  }

  static help() {
    return 'commodore - see more information about this terminal :)'
  }
}