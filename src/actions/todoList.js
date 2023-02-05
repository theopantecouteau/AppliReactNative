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
                    let data = doc.data();
                    data.id = doc.id;
                    let taches = []
                    const docRef2 = db.collection("todo_list").doc(doc.id).collection("taches");
                    docRef2.get().then((querySnapshot2) => {
                        querySnapshot2.forEach((doc) => {
                            taches.push(doc.data());
                        })
                    })
                    data.taches = taches;
                    todo_list.push(data);
                });
                dispatch({
                    type: FETCH_USER_TODO_LIST,
                    payload: {data: todo_list }
                });
            });
        }
        catch (error){
            log.debug(error);
        }
    }
}