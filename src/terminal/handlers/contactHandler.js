import http from "../../clients/http";
import {COMMAND_STATUS, CommandResult, BaseHandler} from '.'

export default class ContactHandler extends BaseHandler{
  constructor() {
    super();
    this.http = http;
  }

  handleApiError(error) {
    // This is not ideal, need to standardize error messages.
    let message = error.response?.data?.message || error?.response?.data?.errors?.json?.email[0];
    console.error(error);
    if (!message) {
      message = 'There was an error when requesting contact information. Please try again later.'
    }
    return new CommandResult(
      COMMAND_STATUS.FAILURE,
      [message]
    )
  }

  handleInvalidAction() {
    return new CommandResult(
      COMMAND_STATUS.FAILURE,
      [
        'INVALID USAGE - Use "contact <email>"',
        'e.g: contact foo@bar.com'
      ]
    )
  }

  async handle(command){
    const result = super.handle(command);
    if (result) return result;

    const action = super.getAction(command);
    if (!action) return this.handleInvalidAction()
    try {
      const { data } = await this.http.post('/contact', {
        email: action
      })
      return new CommandResult(
        COMMAND_STATUS.SUCCESS,
        [data.message]
      )
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  static help(command) {
    return `contact - provide your email for me to send my contact info`
  }
}