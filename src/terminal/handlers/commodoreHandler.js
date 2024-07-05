import {COMMAND_STATUS, CommandResult, BaseHandler} from '.'

export default class CommodoreHandler extends BaseHandler{

  static context = 'commodore'

  async handle(command){
    const result = super.handle(command);
    if (result) return result;

    return new CommandResult(
      COMMAND_STATUS.SUCCESS,
      [
        '** Commodore Landing **',
        '-',
        (
          <span>
            This project doesn't just look A E S T H E T I C, it's also a full-fledged system.
            Behind this simple page, Commodore Landing uses a REST API and a bunch of services like workers,
            queues, and lambda functions to give you this awesome experience.
            All the services are deployed on AWS and you can check them out on my GitHub.
            If you want more details, just click <a href="https://itsadeadh2.github.io/commodore-docs" target="_blank" rel="noreferrer">here.</a>
          </span>
        ),
        '-',
        'See ya!'
      ]
    )
  }

  static help() {
    return 'commodore - see more information about this terminal :)'
  }
}