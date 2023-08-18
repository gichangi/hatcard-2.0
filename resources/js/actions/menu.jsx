import axios from "axios";

//import { url as baseUrl } from "../api";
import {apiFetch} from "./../assets/api/utils";
import * as ACTION_TYPES from "./types";

/**
 * @Actions

 *  Menu Operations

 * returns API response from server => payload: response || error

 */


export const fetchMenu = () => (dispatch) => {

    apiFetch('GET',{},'/api/menu-items',{}).then(res=>{
        // console.log('code is here')
        // console.log(res.data)
        if(res.data){
            dispatch({
                type: ACTION_TYPES.FETCH_MENU,
                payload: 'navigation got here',

            });
        }else{
            dispatch({
                payload: "Something went wrong, please try again",
            });
        }
    })

};

