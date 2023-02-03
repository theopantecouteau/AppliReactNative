import { CREATE_TODOLIST, DELETE_TODOLIST } from "../constants";

const initialToDo = {
    todo : [
        {
            nom : 'Premiere Todo',
            id : 0,
            desc : 'Jsp',
            listeTache : [
                {
                    nom : "Premiere tache", 
                    id: 0,  
                    listeMembre : [{key : "Hugo"}, {key : "Théo"}], 
                    desc : "Description", 
                    date : "December 19, 2022", 
                    url : "www", 
                    attachment: ".jpg",
                    checkbox : false,
                    etiquette : 3
                }
            ]
        }
    ]
}

const listTodoReducer = (state = initialToDo, action) => {
    switch(action.type){
        case CREATE_TODOLIST:
            return {
                ...state,
                todo : [...state.todo, action.payload]
            };
        case DELETE_TODOLIST:
            return {  // returning a copy of orignal state
                ...state, //copying the original state
                todo: state.todo.filter(todos => todos.id !== action.payload)                                
            };
        default : 
            return state;
    }
}

export default listTodoReducer;