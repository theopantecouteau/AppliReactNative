import {LOGIN} from '../constants/index';

const initialState = {
    isConnected: false
};

const connexionReducer = (state = initialState, action) => {
    switch(action.type) {

        case LOGIN:
            return {
                isConnected : action.payload.isConnected
            };

        default:
            return state;
    }
}
export default connexionReducer;