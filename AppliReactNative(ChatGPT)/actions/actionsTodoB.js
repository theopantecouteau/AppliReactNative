// Actions
const CREATE_TASK = 'CREATE_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';
const ADD_CHECKBOX = 'ADD_CHECKBOX';
const UPDATE_CHECKBOX = 'UPDATE_CHECKBOX';
const DELETE_CHECKBOX = 'DELETE_CHECKBOX';
const DUPLICATE_TASK = 'DUPLICATE_TASK';
const TOGGLE_CHECKBOXES = 'TOGGLE_CHECKBOXES';

// Action creators
export function createTask(task) {
  return { type: CREATE_TASK, task };
}

export function updateTask(task) {
  return { type: UPDATE_TASK, task };
}

export function deleteTask(taskId) {
  return { type: DELETE_TASK, taskId };
}

export function addCheckbox(taskId, checkbox) {
  return { type: ADD_CHECKBOX, taskId, checkbox };
}

export function updateCheckbox(taskId, checkbox) {
  return { type: UPDATE_CHECKBOX, taskId, checkbox };
}

export function deleteCheckbox(taskId, checkboxId) {
  return { type: DELETE_CHECKBOX, taskId, checkboxId };
}

export function duplicateTask(taskId) {
  return { type: DUPLICATE_TASK, taskId };
}

export function toggleCheckboxes(taskId) {
  return { type: TOGGLE_CHECKBOXES, taskId };
}
  