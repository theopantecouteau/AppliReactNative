import { createStore, combineReducers, applyMiddleware } from 'redux';
import connexionReducer from '../reducers/connexionReducer';
import usersReducer from '../reducers/usersReducer';
import todoReducer from '../reducers/todoReducer';
import thunk from "redux-thunk";
import listTodoReducer from '../reducers/listTodoReducer';

const rootReducer = combineReducers(
    {   
        isConnected: connexionReducer,
        user: usersReducer,

    }
);
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;