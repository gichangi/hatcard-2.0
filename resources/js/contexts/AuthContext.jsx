import {createContext, useEffect, useReducer, useState} from 'react';
import {
    LARAVEL_STATE_CHANGED,
    UPDATE_NAV_MENU_ITEMS, USER_STATE_CHANGED,
    UPDATE_MENU_TREE
} from '../store/actions';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory} from "react-router-dom";
import {apiFetch} from "../assets/api/utils";
import _ from "lodash";


const initialState = {
    isLoggedIn: false,
    isInitialised: false,
    user: null,
    nav_menu_items:null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case USER_STATE_CHANGED: {
            const { isLoggedIn, user } = action.payload;
            return {
                ...state,
                isLoggedIn,
                isInitialised: true,
                user
            };
        }
        case UPDATE_NAV_MENU_ITEMS:{
            const { navMenuItems } = action.payload;
            return {
                ...state,
                navMenuItems
            };
        }
        case UPDATE_MENU_TREE:{
            const { list } = action.payload;
            return {
                ...state,
                list
            };
        }
        default: {
            return { ...state };
        }
    }

};


const AuthContext = createContext({
    ...initialState,
    emailPasswordSignIn: () => Promise.resolve(),
    logout: () => Promise.resolve()
});

const resetAuthContext = () => {
    return {
        type: USER_STATE_CHANGED,
        payload: {
            isLoggedIn: false,
            user: null
        }
    }
}

const updateAuthState = (payload)=>{
    return {
        "type": "USER_STATE_CHANGED",
        "payload": {
            isLoggedIn: true,
            isInitialised: true,
            token:payload.token,
            "user": payload.user
        }
    }
}
export function updateMenuItemsAction(navMenuItems){
    return {
        "type": "UPDATE_NAV_MENU_ITEMS",
        "payload": {
            menuItems:navMenuItems
        }
    }
}
export function updateMenuAction(navMenuItems){
    return {
        "type": "UPDATE_MENU_TREE",
        "payload": {
            menuItems:navMenuItems
        }
    }
}
 async function  fetchMenuItems (token){
    // create a promise for the axios request
    try{
        let fetchResponse = {};
        let fetchRequest =  await axios({
            method: "get",
            url: "/api/menu-tree",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
        }).then(res =>{
            fetchResponse = {message:'success',data:res.data}
        }).catch(error =>{
            fetchResponse = {message:'error',data:error}
        })
        return fetchResponse;
    }catch (error){

    }
 }


export const AuthProvider = ({ children, props }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const storeDispatch = useDispatch();
    const history = useHistory();
    //const currentMenu= useSelector(state => state.menus.list)

    const emailPasswordSignIn = (email, password) => {
        return apiFetch('post',{ "Accept": "application/json" },'/api/login',{email:email,password:password}).then((response) => {
            const headers = {
                "Accept": "application/json",
                "Authorization": `Bearer ${response.data.token}`
            }
            //Fetch User Details
            const userDetails = apiFetch('post',headers,`/api/user/details`,{email:email}).then(details =>{
               fetchMenuItems(response.data.token).then(res =>{
                    let userDetails = details.data.details;
                    let authStoreData = {
                        token:response.data.token,
                        "user": {
                            "id": userDetails.id,
                            "first_name":userDetails.first_name,
                            "last_name":userDetails.last_name,
                            "email": email,
                            "permissions":_.map(userDetails.user_permissions,'name')
                        }

                    }
                    //Update local store for persistence on refresh
                    localStorage.setItem('hatcard.auth', JSON.stringify(authStoreData));
                   localStorage.setItem('hatcard.navMenuItems', JSON.stringify(_.orderBy(res.data.navigation_menu_items, item => item.order_id, ['asc'])));
                    //Update redux state
                   storeDispatch(updateAuthState(authStoreData))

                   storeDispatch(updateMenuItemsAction(_.orderBy(res.data.navigation_menu_items, item => item.order_id, ['asc'])));
                   storeDispatch(updateMenuAction(_.orderBy(res.data.navigation_menu_items, item => item.order_id, ['asc'])));//update store
                    dispatch(updateMenuAction(_.orderBy(res.data.navigation_menu_items, item => item.order_id, ['asc'])));//update menu state by action
                    dispatch(updateAuthState(authStoreData))
                    dispatch(updateMenuItemsAction(_.orderBy(res.data.navigation_menu_items, item => item.order_id, ['asc'])));
                }).catch(error =>{
                    //console.log("error fetching menu Items");
                    //console.log(error)
                })
            }).catch((error)=>{
                //console.log("Error fetching user details")
                //console.log(error);
            })

            })
            .catch(function (error) {
                return dispatch({
                    "type": "LARAVEL_STATE_CHANGED",
                    "payload": {
                        "isLoggedIn": false,
                        "user": null
                    }
                })
            });


        //return true
        //return firebase.auth().signInWithEmailAndPassword(email, password);
    };

    const logout = () => {
        //Remove auth data from local storage
        localStorage.clear();
        dispatch({
            "type": "USER_STATE_CHANGED",
            "payload": {
                "isLoggedIn": false,
                "user": null
            }
        })
        return history.push('/')
    };

    //Runs at start and page refresh
    useEffect(() => {

        (async () => {
            //check for cookies values if not push to login
            let authStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
            //console.log(authStore)
            if(authStore!== 1){
                let menuItems = await fetchMenuItems(authStore.token);
                if(menuItems.message === 'success'){
                    dispatch(updateAuthState(authStore));

                    dispatch(updateMenuItemsAction( _.orderBy(menuItems.data.navigation_menu_items, item => item.order_id, ['asc'])))
                    dispatch(updateMenuAction( _.orderBy(menuItems.data.navigation_menu_items, item => item.order_id, ['asc'])));//update menu state
                    storeDispatch(updateAuthState(authStore));
                    storeDispatch(updateMenuAction( _.orderBy(menuItems.data.navigation_menu_items, item => item.order_id, ['asc'])));//update menu state
                    storeDispatch(updateMenuItemsAction( _.orderBy(menuItems.data.navigation_menu_items, item => item.order_id, ['asc'])))
                    //localStorage.setItem('hatcard.navMenuItems', JSON.stringify(menuItems.data.navigation_menu_items));
                }else{
                    dispatch(resetAuthContext());
                }
            }else{
                dispatch(resetAuthContext());
            }
        })();


    }, []);

    if (!state.isInitialised) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider value={{ ...state, emailPasswordSignIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};



export default AuthContext;
