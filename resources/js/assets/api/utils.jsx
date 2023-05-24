import axios from "axios";

export const apiFetch = (method,headers,url,data)=>{
    return axios({
        method: method,
        url: url,
        data: data,
        headers: headers
    })

}

