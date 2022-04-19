import axios from 'axios';

export const ADDTOCART = 'ADDTOCART';
export const DELETEFROMCART = 'DELETEFROMCART';
export const UPDATEQUANTITY = 'UPDATEQUANTITY';
export const GETSERVERCARTS = 'GETSERVERCARTS';

export const getCarts = () => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        try {
            const res = await axios({
                method: 'get',
                url: `http://localhost:8800/api/carts/carts/${user._id}`,
                headers: {
                    'authorization': `Bearer ${user.accessToken}`
                }
            });
           
            dispatch({ type: GETSERVERCARTS, carts: res.data.items });
        } catch (err) {
            throw new Error(err.message);
        }
    };
};

export const addToCart = (product) => {
    return async (dispatch, getState) => {
        const user = getState().auth.user;
        try {
            const res = await axios({
                method: 'post',
                url: 'http://localhost:8800/api/carts/createcart',
                headers: {
                    'authorization': `Bearer ${user.accessToken}`
                },
                data: {
                    items: [{
                        userId: user._id,
                        productId: product.id,
                        productImageUrl: product.imageUrl,
                        productTitle: product.title,
                        productDescription: product.description,
                        productColor: product.color,
                        productPrice: product.price,
                        productQuantity: product.qunatity,
                    }]  
                    }
            });

            console.log(res.data);

            dispatch({ type: ADDTOCART, product: {product: product}})
        } catch (err) {
            throw new Error(err.message);
        }
    };
     
};

export const updateQuantity = (itemId, direction, productPrice) => {
    const user = getState()?.auth.user;
    return async (dispatch, getState) => {
        try {
            const res = await axios({
                method: 'patch',
                url: `http://localhost:8800/api/carts/${user._id}`,
                headers: {
                    'authorization': `Bearer ${user.accessToken}`
                }
            });

            dispatch({ type: UPDATEQUANTITY, data: {itemId: itemId, direction: direction, productPrice: productPrice} })
        } catch (err) {
            console.log(err.message);
            throw new Error(err);
        }
    };
};

export const deleteItem = (itemId) => {  
    return { type: DELETEFROMCART, itemId: itemId}
};