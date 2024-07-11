export type GameData = {
    attempts_left: string,
    masked_word: string,
    status: string
    id: string,
}

export type ScoreData = {
    name: string,
    score: number
}

export enum EHangmanState {
    Idle = 0,
    InProgress = 1,
    GameOver = 2,
    LeaderBoard = 3,
    ExitGame = 4
}

export enum GameStates {
    InProgress = 'GAME_IN_PROGRESS',
    GameWon = 'GAME_WON',
    GameLost = 'GAME_LOST'
}