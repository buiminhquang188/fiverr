import clientApi from "apis/clientApi";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE } from "./types";

const actLoginRequest = () => ({
    type: LOGIN_REQUEST,
});

const actLoginSuccess = (currentUser) => ({
    type: LOGIN_SUCCESS,
    payload: { idUser: currentUser.user._id, token: currentUser.token, nameUser: currentUser.user.email, role: currentUser.user.role, avatar: currentUser.user.avatar, nameComment: currentUser.user.name },
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
                if (res.data.user.role === "ADMIN") {
                    history.push("/admin/dashboard")
                }
                else {
                    history.push("/");
                }
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

export const actSignUpSuccess = () => ({
    type: SIGNUP_SUCCESS,
    payload: null,
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
                alert("Sign Up Success, please login to continue")
                history.push("/login");
            }).catch((err) => {
                dispatch(actSignUpFailure("User or email already have!!"))
            });
    }
}