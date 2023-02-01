import {FETCH_USER_DATA, UPDATE_USER_ADDRESS_BOOK} from '../constants/index'
import {db} from "../../firebase-config";
import log from '../../loggerConfig';
export function getUserData(userUid){

    return  (dispatch) => {
        try {
            const docRef = db.collection("users").doc(userUid);
             docRef.get().then((docSnap) => {
                if (docSnap.exists) {
                    log.info("Document data:", docSnap.data());
                } else {
                    log.info("No such document!");
                }
                log.debug("promise ?" + typeof docSnap.data())
                dispatch({
                    type: FETCH_USER_DATA,
                    payload: {data : docSnap.data() , uid : userUid}
                });
            });

        }
        catch (error){
            log.debug(error);
        }
    }
}

export function updateUserAddressBook(data){
    log.info(data);
    return async (dispatch) => {
        try {
            const docRef = db.collection("users").doc(data.uid);
            return docRef.update({
                addressBook : data.addressBook
            }).then(() => {
                log.info("users address_book updated");
                dispatch({
                    type: UPDATE_USER_ADDRESS_BOOK,
                    payload: data
                });
            })
                .catch((error) => log.error("error while updating users address_book ", error));
        }
        catch(error){
            log.error(error);
        }
    }
}