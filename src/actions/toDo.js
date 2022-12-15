import { GET_TODO_ACTION, ADD_TODO_ACTION, UPDATE_TODO_ACTION, DELETE_TODO_ACTION } from '../constants';

export function addTodo(todo) {
    return {
        type: ADD_TODO_ACTION,
        payload: todo
    }
}

export function getTodo(todo) {
    return {
        type: GET_TODO_ACTION,
        payload: todo
    }
}

export function updateTodo(todo) {
    return {
        type: UPDATE_TODO_ACTION,
        payload: todo
    }
}

export function deleteTodo(todo) {
    return {
        type: DELETE_TODO_ACTION,
        payload: todo
    }
}