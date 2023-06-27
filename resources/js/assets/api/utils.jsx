import axios from "axios";

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

