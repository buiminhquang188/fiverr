import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "./types"

const initialState = {
    currentUser: null,
    loading: false,
    error: null,
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };

        case LOGIN_SUCCESS:
            return { ...state, loading: false, currentUser: payload };

        case LOGIN_FAILURE:
            return { ...state, loading: false, error: payload };

        case LOGOUT:
            return { ...state, currentUser: payload };

        default:
            return state;
    }
};

export default authReducer;
