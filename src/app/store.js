import { createStore, combineReducers, applyMiddleware } from 'redux';
import connexionReducer from '../reducers/connexionReducer';
import usersReducer from '../reducers/usersReducer';
import addressBookReducer from "../reducers/addressBookReducer";
import todoListReducer from "../reducers/todoListReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers(
    {   
        isConnected: connexionReducer,
        user: usersReducer,
        addressBook : addressBookReducer,
        todoList : todoListReducer
    }
);
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;