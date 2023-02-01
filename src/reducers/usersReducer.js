import {FETCH_USER_DATA, UPDATE_USER_ADDRESS_BOOK, UPDATE_USER_DATA} from '../constants/index';
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

const usersReducer = (state = initialState, action) => {
    switch(action.type) {

        case FETCH_USER_DATA:
            return {
                user: {firstname: action.payload.data.firstname, lastname: action.payload.data.lastname, todoList: action.payload.data.todoList, addressBook: action.payload.data.addressBook, uid : action.payload.uid}
            }
        case UPDATE_USER_ADDRESS_BOOK:
            return {
                ...state,
                addressBook : action.payload.addressBook
            }
        
        default:
            return state;
    }
}

export default usersReducer;

