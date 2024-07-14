import {GameData, ScoreData} from "./types"
import axios, {AxiosInstance} from "axios";

export class AuthenticationError extends Error {}

export default class HangmanApi {
    private http: AxiosInstance;
    constructor(http: AxiosInstance) {
        this.http = http
    }

    retrieveGame = async (gameId:string) => {
        try {
            const { data } = await this.http.get(`/hangman/${gameId}`)
            return data as GameData;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 401) {
                    throw new AuthenticationError()
                }
            }
            throw error;
        }
    }

    takeGuess = async (gameId: string, guess: string) => {
        try {
            const { data } = await this.http.post(`/hangman/${gameId}/guess/`, {guess})
            return data as GameData;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 401) {
                    throw new AuthenticationError()
                }
            }
            throw error;
        }
    }

    createGame = async () => {
        try {
            const { data } = await this.http.post('/hangman/')
            return data as GameData;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error?.response?.status === 401) {
                    throw new AuthenticationError()
                }
            }
            throw error;
        }
    }

    getLeaderBoard = async () => {
        const { data } = await this.http.get('/scores/', {params: {filter: 'hangman'}})
        return data as ScoreData[]
    }
}