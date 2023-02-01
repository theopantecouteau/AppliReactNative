import {FETCH_USER_DATA, UPDATE_USER_DATA} from '../constants/index'
import {db} from "../../firebase-config";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import log from '../../loggerConfig';
export function getUserData(userUid){

    return async (dispatch) => {
        try {
            const docRef = await doc(db, "users", userUid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                log.info("Document data:", docSnap.data());
            } else {
                log.info("No such document!");
            }
            dispatch({
                type: FETCH_USER_DATA,
                payload: {data : docSnap.data() , uid : userUid}
            })
        }
        catch (error){
            log.debug(error);
        }
    }
}

export function updateUserData(data){
    log.debug(data);
    return async (dispatch) => {
        try {
            await updateDoc(doc(db, "users", data.uid), {addressBook: data.addressBook}
                .then((res) => log.debug(res))
                .catch((error) => log.error(error)));

            dispatch({
                type: UPDATE_USER_DATA,
                payload: data
            });
        }
        catch(error){
            log.debug(error);
        }
    }
}