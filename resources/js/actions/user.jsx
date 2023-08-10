import axios from "axios";

//import { url as baseUrl } from "../api";

import * as ACTION_TYPES from "./types";

/**

 * @Actions

 *  User Operations

 * returns API response from server => payload: response || error

 * =================================

 * @method POST => register() -> register a new User

 */


export const fetchUsers = () => (dispatch) => {

    axios

        .get(`/api/menu-items`)

        .then((response) => {
               //  console.log("response.data")

            dispatch({

                type: ACTION_TYPES.FETCH_USERS,

                payload: "testing response from the action store",

            });

        })

        .catch((error) => {


            dispatch({

                payload: "Something went wrong, please try again",

            });



        });

};

