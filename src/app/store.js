import { createStore, combineReducers, applyMiddleware } from 'redux';
import connexionReducer from '../reducers/connexionReducer';
import usersReducer from '../reducers/usersReducer';
import todoReducer from '../reducers/todoReducer';
import addressBookReducer from '../reducers/addressBookReducer';
import thunk from "redux-thunk";

const rootReducer = combineReducers(
    {   
        isConnected: connexionReducer,
        user: usersReducer,
        addressBook : addressBookReducer,
        tache : todoReducer 
    }
);
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;