import { createStore, combineReducers, applyMiddleware } from 'redux';
import connexionReducer from '../reducers/connexionReducer';
import usersReducer from '../reducers/usersReducer';
import thunk from "redux-thunk";

const rootReducer = combineReducers(
    {   
        isConnected: connexionReducer,
        user: usersReducer
    }
);
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;