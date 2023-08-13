import axios from "axios";

//import { url as baseUrl } from "../api";
import {apiFetch} from "./../assets/api/utils";
import * as ACTION_TYPES from "./types";

/**

 * @Actions

 *  User Operations

 * returns API response from server => payload: response || error

 * =================================

 * @method POST => register() -> register a new User

 */


export const fetchUsers = () => (dispatch) => {

    apiFetch('GET',{},'/api/menu-items',{}).then(res=>{
        if(res.data){
            dispatch({
                type: ACTION_TYPES.FETCH_USERS,
                payload: res.data,

            });
        }else{
            dispatch({
                payload: "Something went wrong, please try again",
            });
        }
    })

};

