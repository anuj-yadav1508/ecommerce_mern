import React from 'react';
import Footer from '../../components/footer/Footer';
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../../components/navbar/Navbar';
import "./productDetailPage.css";
import { Link, useLocation } from 'react-router-dom';
import { addToCart } from '../../redux/actions/cartActions';

const ProductDetailPage = () => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products);
    const location = useLocation();
    const productId = location.pathname.split('/')[2];
    const selectedProduct = products.find(product => product.id === productId);

    const addHandler = () => {
        dispatch(addToCart(selectedProduct))
    }
    
    return (
        <>
        <Navbar />
        <div className='productDetailSection'>
            <div className="productDetailWrapper">
                <div className="productImageContainer">
                    <img src={selectedProduct.imageUrl} alt="" className="productImage" />
                </div>

                <div className="productInfoContainer">
                    <div className="productTitle">{selectedProduct.title}</div>
                    <div className="productDescription">{selectedProduct.description}</div>
                    <div className="productPrice">$ {selectedProduct.price} <span className="productPriceSpan">(20% OFF)</span></div>
                    <div className="productColor"><span className="productColorSpan">Color:</span> {selectedProduct.color}</div>
                    
                    <div className="productAddButton" onClick={addHandler}>Add to Cart</div>
                    <Link to='/cart/user' style={{textDecoration: 'none'}}>
                    <div className="productGoCartButton">Go to Cart</div>
                    </Link>
                    <div className="productBuyButton">Buy Product</div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default ProductDetailPage
