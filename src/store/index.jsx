import {combineReducers, createStore} from 'redux'
import { todoReducer } from './todoReducer'
export default createStore(
    combineReducers({
        todos: todoReducer,
        filter: (state=0, action) => state 
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
