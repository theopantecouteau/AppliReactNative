import {FETCH_USER_DATA, UPDATE_USER_DATA} from '../constants/index';
import log from "../../loggerConfig"

const initialState = {
    user : {
        firstname : "",
        lastname : "",
        todoList : [],
        addressBook : [],
        uid : ""
    }
};

const usersReducer = async (state = initialState, action) => {
    log.debug(action.payload);
    switch(action.type) {

        case FETCH_USER_DATA:
            return {
                user: {firstname: action.payload.data.firstname, lastname: action.payload.data.lastname, todoList: [], addressBook: [], uid : action.payload.uid}
            }
        case UPDATE_USER_DATA:
            return {
                ...state,
                addressBook : action.payload.addressBook
            }
        
        default:
            return state;
    }
}

export default usersReducer;

