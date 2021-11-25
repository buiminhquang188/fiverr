import axios from "axios";
import { BASE_URL, TOKEN_CLASS } from "settings/apiConfig"

const callApi = (endpoint, method = 'GET', data = null, token) => {
    return axios({
        url: `${BASE_URL}/${endpoint}`,
        method,
        data,
        headers: token ? {
            token: token,
            tokenByClass: TOKEN_CLASS,
        } : { tokenByClass: TOKEN_CLASS },
    })
}

export default callApi;