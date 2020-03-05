// import
import { combineReducers } from 'redux';
import {productReducer} from "./products";

export default combineReducers({
    data: productReducer
})