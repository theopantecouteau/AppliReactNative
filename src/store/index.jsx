import {combineReducers, createStore} from 'redux'
import { todosReducers } from './todoReducer'

export default createStore(
    combineReducers({
        todos: todosReducers,
        filter: (state=0, action) => state 
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)