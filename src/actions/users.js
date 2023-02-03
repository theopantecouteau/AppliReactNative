import {FETCH_USER_ADDRESS_BOOK, FETCH_USER_DATA, UPDATE_USER_ADDRESS_BOOK} from '../constants/index'
import {db} from "../../firebase-config";
import log from '../../loggerConfig';
export function getUserData(userUid){

    return  (dispatch) => {
        try {
            const docRef = db.collection("users").doc(userUid);
             docRef.get().then((docSnap) => {
                 const address_book = []
                 const docRef = db.collection("users").doc(userUid).collection("address_book");
                 docRef.get().then((querySnapshot) => {
                     querySnapshot.forEach((doc) => {
                         address_book.push((doc.data()));
                     });
                     const todo_list = []
                     const docRef = db.collection("users").doc(userUid).collection("todo_list");
                     docRef.get().then((querySnapshot) => {
                         querySnapshot.forEach((doc) => {
                             todo_list.push(doc.data());
                         });
                         dispatch({
                             type: FETCH_USER_DATA,
                             payload: {data: docSnap.data(), addressBook : address_book, todoList : todo_list, uid: userUid}
                         });
                     });
                 });
            });
        }
        catch (error){
            log.debug(error);
        }
    }
}

export function getAddressBook(userUid){

    return (dispatch, getState) => {
        try {
            let user = getState().user.user;
            const address_book = []
            const docRef = db.collection("users").doc(userUid).collection("address_book");
            docRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    address_book.push((doc.data()));
                })
                log.info(user)
                user.addressBook = address_book;
                dispatch({
                    type: FETCH_USER_ADDRESS_BOOK,
                    payload: {data : user}
                });
            });
        }
        catch (error){
            log.debug(error);
        }
    }
}

export function getTodoList(userUid){

    return (dispatch, getState) => {
        try {
            console.log('1')
            let user = getState().user.user;
            const todo_list = []
            const docRef = db.collection("users").doc(userUid).collection("todo_list");
            console.log('2')
            docRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.data().id = doc.id;
                    todo_list.push(doc.data());
                })
                console.log('4')
                user.todoList = todo_list;
                dispatch({
                    type: FETCH_USER_ADDRESS_BOOK,
                    payload: {data : user}
                });
                console.log('5')
            });
        }
        catch (error){
            log.debug(error);
        }
    }
}