import { createStore, combineReducers } from 'redux';
import connexionReducer from '../reducers/connexionReducer';
import todoReducer from '../reducers/todoReducer';

const rootReducer = combineReducers(
    { isConnected: connexionReducer ,
     tache : todoReducer }
);

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;