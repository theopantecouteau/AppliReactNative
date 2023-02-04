import {FETCH_USER_ADDRESS_BOOK} from '../constants/index'
import {db} from "../../firebase-config";
import log from '../../loggerConfig';
export function getUserAddressBook(userUid){

    return  (dispatch) => {
        try {
            let address_book = []
            const docRef =  db.collection("address_book").where("uid", "==", userUid);
            docRef.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    address_book.push(doc.data());
                });
                log.info(address_book);
                dispatch({
                    type: FETCH_USER_ADDRESS_BOOK,
                    payload: {data: address_book, uid: userUid}
                });
            });
        }
        catch (error){
            log.debug(error);
        }
    }
}