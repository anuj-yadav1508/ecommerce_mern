import axios from "axios";

export const GETSERVERPRODUCTS = 'GETSERVERPRODUCTS';

export const getServerProducts = () => {
    return async dispatch => {
        try {
            const res = await axios({
                method: 'get',
                url: 'http://localhost:8800/api/products/allproducts',

            });
            console.log(res.data);

            dispatch({ type: GETSERVERPRODUCTS, products: res.data })
        } catch (err) {
            console.log(err.message);
        }
    };
};