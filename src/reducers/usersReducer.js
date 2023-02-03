import {
    FETCH_USER_ADDRESS_BOOK,
    FETCH_USER_DATA,
    FETCH_USER_TODO_LIST,
    UPDATE_USER_ADDRESS_BOOK,
    UPDATE_USER_DATA
} from '../constants/index';
import log from "../../loggerConfig"
import addressBook from "../screens/AddressBook";

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
                user : {firstname: action.payload.data.firstname, lastname: action.payload.data.lastname, todoList: action.payload.todoList, addressBook: action.payload.addressBook, uid: action.payload.uid}

            }

        case FETCH_USER_ADDRESS_BOOK :
            return {
                ...state,
                addressBook: action.payload.data
            }

        case FETCH_USER_TODO_LIST:
            return {
                ...state,
                todoList : action.payload.data
            }
        default:
            return state;
    }
}

export default usersReducer;

