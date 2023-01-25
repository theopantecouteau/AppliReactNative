const initialState = {
    tasks: [],
  };
  
  export default function reducer(state = initialState, action) {
    switch (action.type) {
      case CREATE_TASK: {
        const { task } = action;
        return {
          ...state,
          tasks: [...state.tasks, task],
        };
      }
      case UPDATE_TASK: {
        const { task } = action;
        return {
          ...state,
          tasks: state.tasks.map(t => {
            if (t.id === task.id) {
              return task;
            }
            return t;
          }),
        };
      }
      case DELETE_TASK: {
        const { taskId } = action;
        return {
          ...state,
          tasks: state.tasks.filter(t => t.id !== taskId),
        };
      }
      case ADD_CHECKBOX: {
        const { taskId, checkbox } = action;
        return {
          ...state,
          tasks: state.tasks.map(t => {
            if (t.id === taskId) {
              return {
                ...t,
                checkboxes: [...t.checkboxes, checkbox],
              };
            }
            return t;
          }),
        };
      }
      case UPDATE_CHECKBOX: {
        const { taskId, checkbox } = action;
        return {
          ...state,
          tasks: state.tasks.map(t => {
            if (t.id === taskId) {
              return {
                ...t,
                checkboxes: t.checkboxes.map(c => {
                  if (c.id === checkbox.id) {
                    return checkbox;
                  }
                  return c;
                }),
              };
            }
            return t;
          }),
        };
      }
      case DELETE_CHECKBOX: {
        const { taskId, checkboxId } = action;
        return {
          ...state,
          tasks: state.tasks.map(t => {
            if (t.id === taskId) {
              return {
                ...t,
                checkboxes: t.checkboxes.filter(c => c.id !== checkboxId),
              };
            }
            return t;
          }),
        };
      }
      case DUPLICATE_TASK: {
        const { taskId } = action;
        const task = state.tasks.find(t => t.id === taskId);
        if (!task) {
          return state;
        }
        const newTask = {
          ...task,
          id: uuid(), // générez un nouvel ID pour la tâche dupliquée
        };
        return {
          ...state,
          tasks: [...state.tasks, newTask],
        };
      }
      case TOGGLE_CHECKBOXES: {
        const { taskId } = action;
        return {
          ...state,
          tasks: state.tasks.map(t => {
            if (t.id === taskId) {
              return {
                ...t,
                showCheckboxes: !t.showCheckboxes,
              };
            }
            return t;
          }),
        };
      }
      default:
        return state;
    }
  }
  
  