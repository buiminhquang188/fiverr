import clientApi from "apis/clientApi";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./types";

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
                dispatch(actLoginSuccess(res.data));
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

export const actSignUpRequest = () => ({
    type: SIGNUP_REQUEST
})

export const actSignUpSuccess = (user) => ({
    type: SIGNUP_SUCCESS,
    payload: user
})

export const actSignUpFailure = (error) => ({
    type: SIGNUP_FAILURE,
    payload: error
})

export const actSignUp = (user, history) => {
    return dispatch => {
        dispatch(actSignUpRequest());
        clientApi
            .signUpApi(user)
            .then((result) => {
                dispatch(actSignUpSuccess(result.data));
            }).catch((err) => {
                dispatch(actSignUpFailure("User or email already have!!"))
            });
        history.push('/')
    }
}