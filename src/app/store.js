import { createStore, combineReducers, applyMiddleware } from 'redux';
import connexionReducer from '../reducers/connexionReducer';
import usersReducer from '../reducers/usersReducer';
<<<<<<< HEAD
import todoReducer from '../reducers/todoReducer';
=======
import addressBookReducer from "../reducers/addressBookReducer";
import todoListReducer from "../reducers/todoListReducer";
>>>>>>> 290c9e7b72a48d3cdb0866c37ae9f093c322f8e7
import thunk from "redux-thunk";
import listTodoReducer from '../reducers/listTodoReducer';

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