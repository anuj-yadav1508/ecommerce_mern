import { LOGIN, LOGOUT } from "../actions/authActions";

const initialState = {
    user: JSON.parse(localStorage.getItem('userData')) || null
};

const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: {
            return {
                user: action.userData
            }
        }
        case LOGOUT: {
            return { 
                user: null
            }
        }
        default: {
            return state;
        }
    }
};

export default AuthReducer;