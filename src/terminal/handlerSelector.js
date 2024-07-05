import {
    ContactHandler,
    HelpHandler,
    ClearHandler,
    AboutHandler,
    ProjectsHandler,
    CommodoreHandler,
    LoginHandler,
    BaseHandler,
    ContextTestHandler
} from "./handlers"

const getHandlersMapping = () => {
    const mapping = {}
    mapping[HelpHandler.context] = HelpHandler
    mapping[ProjectsHandler.context] = ProjectsHandler
    mapping[AboutHandler.context] = AboutHandler
    mapping[ClearHandler.context] = ClearHandler
    mapping[ContactHandler.context] = ContactHandler
    mapping[CommodoreHandler.context] = CommodoreHandler
    mapping[LoginHandler.context] = LoginHandler
    mapping[ContextTestHandler.context] = ContextTestHandler

    return mapping
}

export const handlerSelector = (rootCommand, context) => {
    let handler = BaseHandler
    const handlersMapping = getHandlersMapping()
    if (context === 'main') {
        handler = handlersMapping[rootCommand];
    } else {
        handler = handlersMapping[context]
    }
    if (!handler) return null
    return new handler();
}