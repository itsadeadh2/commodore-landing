import http from "../../clients/http";
import {COMMAND_STATUS, CommandResult, BaseHandler} from '.'

export default class ContactHandler extends BaseHandler{

  static context = 'contact'

  actionsMapping = {
    '': this.handleEmptyAction.bind(this),
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

  handleEmptyAction() {
    return new CommandResult(
      COMMAND_STATUS.SUCCESS,
      [
        'Here is my basic contact information:',
        (<span>E-Mail: <a href="mailto:itsadeadh2@gmail.com">itsadeadh2@gmail.com</a></span>),
        (<span>GitHub: <a href="https://github.com/itsadeadh2" target="_blank" rel="noreferrer">https://github.com/itsadeadh2</a></span>),
        (<span>LinkedIn: <a href="https://www.linkedin.com/in/barbosathiagodev/" target="_blank" rel="noreferrer">https://www.linkedin.com/in/barbosathiagodev/</a></span>),
        (<br/>),
        (<span>For more information, such as WhatsApp and Resume, please use <strong>"contact youremail@email.com"</strong></span>),
      ]
    )
  }

  async handleEmailAction(email) {
    try {
      const { data } = await http.post('/api/contact', {
        email: email
      })
      return new CommandResult(
        COMMAND_STATUS.SUCCESS,
        [data.message]
      )
    } catch (error) {
      return this.handleApiError(error);
    }
  }

  async handle(command){
    const result = super.handle(command);
    if (result) return result;

    const action = super.getAction(command);
    let actionHandle = this.actionsMapping[action] || this.handleEmailAction.bind(this);
    return actionHandle(action);
  }

  static help(command) {
    return `contact - provide your email for me to send my contact info`
  }
}