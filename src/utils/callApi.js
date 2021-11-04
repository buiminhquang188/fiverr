import axios from "axios";
import { BASE_URL, TOKEN, TOKEN_CLASS } from "settings/apiConfig"

const callApi = (endpoint, method = 'GET', data = null, token = TOKEN) => {
    return axios({
        url: `${BASE_URL}/${endpoint}`,
        method,
        data,
        headers: token ? {
            Authorization: 'Bearer ' + token,
            token: token,
            tokenByClass: TOKEN_CLASS,
        } : { tokenByClass: TOKEN_CLASS },
    })
}

export default callApi;