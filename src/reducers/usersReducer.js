import {FETCH_USER_DATA} from '../constants/index';

const initialState = {
    user : {
        firstname : "",
        lastname : "",
        uid : ""
    }
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {

        case FETCH_USER_DATA:
            return {
                user : {firstname: action.payload.data.firstname, lastname: action.payload.data.lastname, uid: action.payload.uid}

            }
        default:
            return state;
    }
}

export default usersReducer;

