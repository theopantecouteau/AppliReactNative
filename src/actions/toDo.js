import { GET_TASK, CREATE_TASK, UPDATE_TASK, DELETE_TASK, ADD_TASK, DUPLICATE_TASK, TOGGLE_CHECKBOXES, CREATE_TODOLIST, DELETE_TODOLIST } from '../constants';

export function addTodo(todo) {
    return {
        type: ADD_TASK,
        payload: todo
    }
}

export function getTodo(todo) {
    return {
        type: GET_TASK,
        payload: todo
    }
}

export function updateTodo(todo) {
    return {
        type: UPDATE_TASK,
        payload: todo
    }
}

export function deleteTodo(todo) {
    return {
        type: DELETE_TASK,
        payload: todo
    }
}

export function createTodo(todo) {
      return {
        type: CREATE_TASK,
        payload: todo
    }
}

export function duplicateTodo(todo) {
    return { 
        type: DUPLICATE_TASK, 
        payload : todo 
    }
}

export function toggleCheckboxes(todo) {
    return { 
        type: TOGGLE_CHECKBOXES, 
        payload: todo 
    }
}

export function createToDolist(todo){
    return { 
        type: CREATE_TODOLIST, 
        payload: todo 
    }
}

export function deleteTodoListe(todo){
    return { 
        type: DELETE_TODOLIST, 
        payload: todo 
    }
}