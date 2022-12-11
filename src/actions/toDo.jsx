import { ADD_TODO_ACTION, UPDATE_TODO_ACTION  } from '../constants';

export function addTodo(todo) {
    return {
        type: ADD_TODO_ACTION,
        payload: todo
    }
}

export function updateTodo(todo) {
    return {
        type: UPDATE_TODO_ACTION,
        payload: todo
    }
}