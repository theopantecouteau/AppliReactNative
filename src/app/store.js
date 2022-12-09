import { createStore, combineReducers } from 'redux';
import connexionReducer from '../reducers/connexionReducer';

const rootReducer = combineReducers(
    { isConnected: connexionReducer }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;