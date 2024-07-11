export enum EProjectState {
    SelectLanguage,
    ViewResults,
    ExitProjects
}

export type project = {
    description: string,
    docs_link?: string
    github_link: string,
    language: string,
    name: string,
    stack: string,
    id: number
}