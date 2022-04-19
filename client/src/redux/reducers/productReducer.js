import Product from "../../models/product-item";
import { GETSERVERPRODUCTS } from "../actions/productActions";

const initialState = {
    products: []
}

const ProductReducer = (state = initialState, action) => {
    switch(action.type) {
        case GETSERVERPRODUCTS: {
            const products = action.products;

            const changedProducts = products.map(product => (
                new Product(product._id, product.userId, product.productTitle, product.productImageUrl, product.productDescription, product.productPrice, product.productColor, product.productCategory)
            ))

            return {
                ...state,
                products: changedProducts
            }
        }
        default: {
            return state;
        }
    }
};


export default ProductReducer;