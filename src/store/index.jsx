import {combineReducers, createStore} from 'redux'
import { todosReducers } from './todoReducer'

const store =  createStore(
    combineReducers({
        todos: todosReducers,
        filter: (state=0, action) => state 
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export const TodoListStore = connect(
    (state) => ({
        todos: state.todos
    }),
    (dispatch) =>({
        onToggle : todo => dispatch({
            type : UPDATE_TODO_ACTION,
            payload : {...todo, completed : !todo.completed}
        })
    })
)(TodoList)
export default store;