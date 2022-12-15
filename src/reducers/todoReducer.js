import { GET_TODO_ACTION, ADD_TODO_ACTION, UPDATE_TODO_ACTION  } from '../constants';
import Tache from '../components/Tache';
const initialState = {
    tache : [
        <Tache props={{
            nom : "Nom", 
            id: "0", 
            isDetail : false, 
            parentFunction : ()=> {return null}, 
            listeMembre : ["Hugo", "Theo"], 
            desc : "Description", 
            date : "Date", 
            url : "www"
        }}/>
    ]
}

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_TODO_ACTION:
            return {
                tache : action.payload.tache
            };
        default : 
            return state;
    }
}

export default todoReducer;