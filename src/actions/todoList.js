import {FETCH_USER_TODO_LIST} from '../constants/index'
import {db} from "../../firebase-config";
import log from '../../loggerConfig';
export function getUserTodoList(userUid){

    return  (dispatch) => {
        try {
            let todo_list = []
            const docRef =  db.collection("todo_list").where("uid", "==", userUid);
            docRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    todo_list.push(doc.data());
                });
                dispatch({
                    type: FETCH_USER_TODO_LIST,
                    payload: {data: todo_list, uid: userUid}
                });
            });
        }
        catch (error){
            log.debug(error);
        }
    }
}