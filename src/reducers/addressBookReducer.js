import {FETCH_USER_ADDRESS_BOOK} from '../constants/index';

const initialState = {
    addressBook : []
};

const addressBookReducer = (state = initialState, action) => {
    switch(action.type) {

        case FETCH_USER_ADDRESS_BOOK:
            return {
                addressBook : action.payload.data
            }

        default:
            return state;
    }
}

export default addressBookReducer;