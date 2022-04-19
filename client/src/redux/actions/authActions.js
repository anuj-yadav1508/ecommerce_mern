import axios from "axios";

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => {
    return async dispatch => {
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:8800/api/auth/login',
                data: {
                    email,
                    password
                }
            });

            localStorage.setItem('userData', JSON.stringify(res.data));

            dispatch({ type: LOGIN, userData: res.data });

        } catch (err) {
            throw new Error(err);
        }
    };
};

export const logout = () => {
    localStorage.removeItem('userData');
    return { type: LOGOUT };
};