import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from 'redux-thunk';

import ProductReducer from "./reducers/productReducer";
import CartReducer from './reducers/cartReducer';
import AuthReducer from "./reducers/authReducer";

const rootReducer = combineReducers({
    products: ProductReducer,
    cart: CartReducer,
    auth: AuthReducer, 
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;