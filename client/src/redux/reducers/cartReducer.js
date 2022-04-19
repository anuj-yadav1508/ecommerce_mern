import CartItem from "../../models/cart-item";
import { ADDTOCART, DELETEFROMCART, UPDATEQUANTITY, GETSERVERCARTS } from "../actions/cartActions";

const initialState = {
    items: [],
    totalAmount: 0
};

const CartReducer = (state = initialState, action) => {
    switch(action.type) {
        case GETSERVERCARTS: {
            
            const cartItems = action.carts.map(item => (
                new CartItem(item._id, item.productId, item.productImageUrl, item.productTitle, item.productDescription, item.productColor, item.productQuantity, item.productPrice)
            ));

            let totals = [];
            totals = cartItems.map(item => {
                return  item.price * item.quantity;
                
            });
            
            let sum = 0;
            sum = totals.reduce((a,b) => a + b);
            
            
            return {
                ...state,
                items: cartItems,
                totalAmount: sum
            }
        }
        case ADDTOCART: {
            const productId = action.product.product.id;
            
            const presentProduct = state.items.find(item => item.productId === productId);
            if(presentProduct) {
                const productIndex = state.items.findIndex(product => product.productId === productId);
                const itemQuantity = presentProduct.quantity + 1;
                const itemPrice = presentProduct.price * itemQuantity;
                const updatedCartItem = new CartItem(presentProduct.id, presentProduct.productId, presentProduct.imageUrl, presentProduct.title, presentProduct.description, presentProduct.soldBy, presentProduct.color, itemQuantity, itemPrice);

                let updatedItems = [...state.items]
                updatedItems[productIndex] = updatedCartItem;

                return {
                    ...state,
                    items : updatedItems,
                    totalAmount : state.totalAmount + presentProduct.price
                }

                
            }else {
                const newCartItem = new CartItem(new Date().toString(), action.product.product.id, action.product.product.imageUrl, action.product.product.title, action.product.product.description, action.product.product.soldBy, action.product.product.color, 1, action.product.product.price) ;
                
                return {
                    ...state, 
                    items: state.items.concat(newCartItem),
                    totalAmount : state.totalAmount + newCartItem.price
                }
            }
        }

        case UPDATEQUANTITY: {
            const direction = action.data.direction;
            console.log(direction);
            const presentItem = state.items.find(item => item.id === action.data.itemId);
            console.log(presentItem)
            const itemIndex = state.items.findIndex(item => item.id === action.data.itemId);
            if(direction === 'increase') {
                const updatedQuantity = presentItem.quantity + 1;
                const updatedPrice = updatedQuantity * action.data.productPrice;
                
                const updatedCartItem = new CartItem(presentItem.id, presentItem.productId, presentItem.imageUrl, presentItem.title, presentItem.description, presentItem.color, updatedQuantity, updatedPrice);

                let updatedItems = [...state.items]
                updatedItems[itemIndex] = updatedCartItem;

                return {
                    ...state,
                    items : updatedItems,
                    totalAmount : state.totalAmount + action.data.productPrice
                }
            }
            if(presentItem.quantity > 1 && direction === 'decrease') {
                const updatedQuantity = presentItem.quantity - 1;
                const updatedPrice = presentItem.price - action.data.productPrice;
                const updatedCartItem = new CartItem(presentItem.id, presentItem.productId, presentItem.imageUrl, presentItem.title, presentItem.description, presentItem.color, updatedQuantity, updatedPrice);

                let updatedItems = [...state.items]
                updatedItems[itemIndex] = updatedCartItem;

                return {
                    ...state,
                    items : updatedItems,
                    totalAmount : state.totalAmount - action.data.productPrice
                }
            }
            if(presentItem.quantity === 1 && direction === 'decrease') {
                
                let updatedItems = [...state.items];
                updatedItems = updatedItems.filter(item => item.id !== action.data.itemId);

                return {
                    ...state,
                    items: updatedItems,
                    totalAmount : state.totalAmount - action.data.productPrice
                }
            }else {
                return state;
            }
        }

        case DELETEFROMCART: {
            const itemId = action.itemId;
            const selectedProduct = state.items.find(item => item.id === itemId);
            
            const quantity = selectedProduct.quantity;
            if(quantity > 1) {
                const itemIndex = state.items.findIndex(item => item.id === itemId);

                const itemQuantity = selectedProduct.quantity - 1;
                const itemPrice = selectedProduct.price * itemQuantity;

                const updatedCartItem = new CartItem(selectedProduct.id, selectedProduct.productId, selectedProduct.imageUrl, selectedProduct.title, selectedProduct.description, selectedProduct.soldBy, selectedProduct.color, itemQuantity, itemPrice)

                const updatedItems = [...state.items];
                updatedItems[itemIndex] = updatedCartItem;

                return {
                    ...state, 
                    items: updatedItems,
                    totalAmount : state.totalAmount - itemPrice
                }

            }else {
                const item = state.items.find(item => item.id === itemId);
                let updatedItems = [...state.items];
                updatedItems = updatedItems.filter(item => item.id !== itemId);

                return {
                    ...state,
                    items: updatedItems,
                    totalAmount : state.totalAmount - item.price
                }

            }
        }
        default: {
            return state;
        }
    }
};

export default CartReducer;