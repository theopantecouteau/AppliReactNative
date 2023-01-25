import { ADD_TASK, DELETE_TASK, TOGGLE_CHECKBOXES, UPDATE_TASK, ADD_CHECKBOX, DELETE_CHECKBOX } from './actions';

const initialState = {
  tasks: [],
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case TOGGLE_CHECKBOXES:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, showCheckboxes: !task.showCheckboxes }
            : task
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? action.payload
            : task
        ),
      };
    case ADD_CHECKBOX:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, checkboxes: [...task.checkboxes, action.payload] }
            : task
        ),
      };
      case DELETE_CHECKBOX:
        return {
          ...state,
          tasks: state.tasks.map(task => {
            if (task.id === action.payload.taskId) {
              return {
                ...task,
                checkboxes: task.checkboxes.filter(checkbox => checkbox.id !== action.payload.id),
              };
            }
            return task;
          }),
        };
      default:
        return state;
    }
  }
  
