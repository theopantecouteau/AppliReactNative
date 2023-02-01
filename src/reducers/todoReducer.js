import { GET_TASK, ADD_TASK, UPDATE_TASK, DELETE_TASK, DUPLICATE_TASK, TOGGLE_CHECKBOXES } from '../constants';

const initialState = {
    tache : [
        {
            nom : "Nom", 
            id: "0",  
            listeMembre : [{key : "Hugo"}, {key : "Théo"}], 
            desc : "Description", 
            date : "December 19, 2022", 
            url : "www", 
            attachment: ".jpg",
            checkbox : false
        }
    ]
}

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_TASK:
            return {
                tache : action.payload.tache
            };
        case ADD_TASK:
            return {
                ...state,
                tache : [...state.tache, action.payload]
            };
        case DELETE_TASK: 
            return {  // returning a copy of orignal state
                ...state, //copying the original state
                tache: state.tache.filter(taches => taches.id !== action.payload)                                
            };
        case UPDATE_TASK: 
            console.debug("DANS LE REDUCER");
            console.debug(action.payload);
            const index = state.tache.findIndex(taches => taches.id !== action.payload.id) +1;                                                                   
            const newArray = [...state.tache]; 
            console.debug(index);
            let object = action.payload;
            newArray[index] = object;
            return { 
                ...state, //copying the orignal state
                tache: newArray, //reassingning todos to new array
            };
        case DUPLICATE_TASK: 
            const task = state.tasks.find(t => t.id === action.payload.id);
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
        
        case TOGGLE_CHECKBOXES: 
            return {
                ...state,
                tasks: state.tasks.map(t => {
                    if (t.id === action.payload.id) {
                        return {
                            ...t,
                            checkbox: !t.checkbox,
                        };
                    }
                    return t;
                }),
            };
        
        default : 
            return state;
    }
}

export default todoReducer;