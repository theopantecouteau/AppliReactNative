import { FETCH_USER_TODO_LIST} from '../constants/index';

const initialState = {
    todoList : []
};

const todoListReducer = (state = initialState, action) => {
    switch(action.type) {

        case FETCH_USER_TODO_LIST:
            return {
                todoList : action.payload.data
            }
        default:
            return state;
    }
}

export default todoListReducer;