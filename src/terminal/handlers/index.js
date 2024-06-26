import BaseHandler from './baseHandler'
import ContactHandler from './contactHandler'
import HelpHandler from './helpHandler'
import ClearHandler from './clearHandler'
import AboutHandler from './aboutHandler'
import ProjectsHandler from "./projectsHandler";
import CommodoreHandler from "./commodoreHandler";
class CommandResult {
  status = ''
  response = []
  constructor(status, response) {
    this.status = status;
    this.response = response;
  }
}

const COMMAND_STATUS = {
  SUCCESS: 200,
  FAILURE: 500,
  CLEAR: 201
}


export {
  COMMAND_STATUS,
  CommandResult,
  BaseHandler,
  ContactHandler,
  HelpHandler,
  ClearHandler,
  AboutHandler,
  ProjectsHandler,
  CommodoreHandler
}