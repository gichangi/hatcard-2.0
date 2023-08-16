import axios from "axios";
import {useReducer} from "react";
import {useDispatch} from "react-redux";
import {menuReducer, updateMenuAction} from "../../contexts/UtilContext";

export const apiFetch = (method,headers,url,data)=>{
    let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
    let apiHeaders = {
        "Accept": "application/json",
        "Authorization": `Bearer ${autStore.token}`
    }
    return axios({
        method: method,
        url: url,
        data: data,
        headers: apiHeaders
    })

}


export function updateMenuStore (){

    const storeDispatch = useDispatch();
    storeDispatch(updateMenuAction([]));//update store
/*    try{
        let autStore = JSON.parse(localStorage.getItem( 'hatcard.auth' )) || 1;
        let fetchResponse = {};
        let fetchRequest =  await axios({
            method: "get",
            url: "/api/menu-tree",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${autStore.token}`
            },
        }).then(res =>{
            console.log('effect1')
            storeDispatch(updateMenuAction(res.data.navigation_menu_items));//update store
            dispatch(updateMenuAction(res.data.navigation_menu_items));//update menu state by action
        }).catch(error =>{
            console.log('effect error')
            console.log({message:'error',data:error})
            fetchResponse = []
        })
    }catch (error){
        return []
    }*/
}
