import {FETCH_USER_DATA} from '../constants/index'
import {db} from "../../firebase-config";
import log from '../../loggerConfig';
export function getUserData(userUid){

    return  (dispatch) => {
        try {
            const docRef = db.collection("users").doc(userUid);
            docRef.get().then((docSnap) => {
                         dispatch({
                             type: FETCH_USER_DATA,
                             payload: {data: docSnap.data(), uid: userUid}
                         });
            });
        }
        catch (error){
            log.debug(error);
        }
    }
}
