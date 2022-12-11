import { LOGIN } from "../constants/index"

export function setConnexionState(isConnected) {
    return {
        type: LOGIN,
        payload: isConnected
    }
}