import { ADD_TODO_ACTION, UPDATE_TODO_ACTION  } from '../constants';
import Tache from '../components/Tache';
const initialState = {
    tache : <Tache props={{nom : "Nom", id: "0", isDetail : false, parentFunction : ()=> {return null}, listeMembre : ["Hugo", "Theo"], desc : "Description", date : "Date", url : "www"}}/>
}

const todoReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TODO_ACTION:
            return [
                ...state, 
                action.payload
            ];
        case UPDATE_TODO_ACTION:
            return state.map(tache =>{
                if (tache.props.id === action.payload.props.id){
                    return {...tache, ...action.payload}
                } else {
                    return tache
                }
            })
        default : 
            return state;
    }
}

export default todoReducer;