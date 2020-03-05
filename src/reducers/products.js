import {data} from '../store/store';
const initialState = data;

export const productReducer = (state = initialState, action) => {
    switch (action.type) {

        // default
        default:
            return state;
    }
};
