import { GET_TODO_ACTION, ADD_TODO_ACTION, UPDATE_TODO_ACTION, DELETE_TODO_ACTION, COMPLETE_TODO_ACTION} from '../constants';
import Tache from '../components/Tache';
const initialState = {
    tache : [
        {
            nom : "Nom", 
            id: "0",  
            listeMembre : [{key : "Hugo"}, {key : "Théo"}], 
            desc : "Description", 
            date : "Date", 
            url : "www"
        }
    ]
}

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_TODO_ACTION:
            return {
                tache : action.payload.tache
            };
        case ADD_TODO_ACTION:
            return {
                ...state,
                tache : [...state.tache, action.payload]
            };
        case DELETE_TODO_ACTION: 
            return {  // returning a copy of orignal state
                ...state, //copying the original state
                tache: state.tache.filter(taches => taches.id !== action.payload)                                
            };
        case COMPLETE_TODO_ACTION: 
            const index = state.tache.findIndex(taches => taches.id !== action.payload.id);                                                                   
            const newArray = [...state.tache]; 
            newArray[index].nom = action.payload.nom
            newArray[index].desc = action.payload.desc
            newArray[index].date = action.payload.date
            newArray[index].pj = action.payload.pj
            newArray[index].url = action.payload.url
            return { 
                ...state, //copying the orignal state
                tache: newArray, //reassingning todos to new array
            };
        default : 
            return state;
    }
}

export default todoReducer;