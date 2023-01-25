export const ADD_TASK = 'ADD_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_CHECKBOXES = 'TOGGLE_CHECKBOXES';
export const UPDATE_TASK = 'UPDATE_TASK';
export const ADD_CHECKBOX = 'ADD_CHECKBOX';
export const DELETE_CHECKBOX = 'DELETE_CHECKBOX';

export const addTask = task => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = id => ({
  type: DELETE_TASK,
  payload: id,
});

export const toggleCheckboxes = id => ({
  type: TOGGLE_CHECKBOXES,
  payload: id,
});

export const updateTask = task => ({
  type: UPDATE_TASK,
  payload: task,
});

export const addCheckbox = checkbox => ({
  type: ADD_CHECKBOX,
  payload: checkbox,
});

export const deleteCheckbox = id => ({
  type: DELETE_CHECKBOX,
  payload: id,
});
