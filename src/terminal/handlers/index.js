import BaseHandler from './baseHandler'
import ContactHandler from './contactHandler'
import HelpHandler from './helpHandler'
import ClearHandler from './clearHandler'
import AboutHandler from './aboutHandler'
import ProjectsHandler from "./projectsHandler";
import CommodoreHandler from "./commodoreHandler";
import LoginHandler from './loginHandler'
import ContextTestHandler from './contextTestHandler'

class CommandResult {
  status = ''
  response = []
  context = ''
  constructor(status, response, context = 'main') {
    this.status = status;
    this.response = response;
    this.context = context
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
  CommodoreHandler,
  LoginHandler,
  ContextTestHandler
}