
const initialState = {
    isLoggedIn: false,
    user: null,
    currentProduct: null
};

//Action Types
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const GET_POST = 'GET_POST';

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null
            };
        case GET_POST:
            return {
                ...state,
                currentProduct: action.payload
            };
        default:
            return state;
    }
};

export function login(user) {
    return {
        type: LOGIN,
        payload: user
    }
}
export function logout() {
    return {
        type: LOGOUT
    }
}
export function getPost(post) {
    return {
        type: GET_POST,
        payload: post
    }
}