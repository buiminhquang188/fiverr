import clientApi from "apis/clientApi";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./types";

const actLoginRequest = () => ({
    type: LOGIN_REQUEST,
});

const actLoginSuccess = (currentUser) => ({
    type: LOGIN_SUCCESS,
    payload: currentUser,
});

const actLoginFailure = (error) => ({
    type: LOGIN_FAILURE,
    payload: error,
});

export const actLogin = (user, history) => {
    return dispatch => {
        dispatch(actLoginRequest());
        clientApi
            .loginApi(user)
            .then((res) => {
                dispatch(actLoginSuccess(res.data.content));
                history.push("/");
            }).catch((err) => {
                dispatch(actLoginFailure(err));
            });
    }
}

export const actLogout = () => ({
    type: LOGOUT,
    payload: null,
})