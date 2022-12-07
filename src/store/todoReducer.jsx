let id =2;
const initialState = [
    {
        id : 1,
        title: 'Enregister le tutoriel',
        completed: false
    },    
    {
        id : 2,
        title: 'Préparer le tutoriel',
        completed: true
    },
]

export const ADD_TODO_ACTION = 'ADD_TODO_ACTION'

export function todoReducer(state = initialState, action){
    switch(action.type){
        case ADD_TODO_ACTION:
            return [...state, {id : ++id, completed: false, ...action.payload}]
        default:
            return state
    }
}
