import React, { useEffect, useState } from 'react';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';

import Navbar from '../../components/navbar/Navbar';
import CartItem from '../../components/sub-items/cartItem/CartItem';
import Footer from '../../components/footer/Footer';
import { Link } from 'react-router-dom';
import { getCarts } from '../../redux/actions/cartActions';
import { getServerProducts } from '../../redux/actions/productActions';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const products = useSelector(state => state.products.products);
    console.log(cartItems);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
       const fetchCarts = async () => {
           try {
               await dispatch(getCarts());
           } catch (err) {
               console.log(err.message);
           }
       };

       fetchCarts();
    }, [dispatch])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await dispatch(getServerProducts());
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchProducts();
    },[dispatch]);
    
    const emptyCart = cartItems.length === 0;

    // cartItems quantity
    let numbers = 0;
    const totalNumbers = cartItems.map(item => {
        return (
            numbers = numbers + item.quantity
        )
    }); 
    
    return (
        <>
            <Navbar />
            <div className='cartSection'>
                <div className="cartWrapper">
                    <div className="cartItems">
                        {/* cart items services start */}
                        <div className="cartItemsServicesContainer">
                            <p className="cartItemsServiesText">Check delivery time and Services</p>
                            <button className="cartItemsServiesButton">ENTER PIN CODE</button>
                        </div>
                        {/* cart items services ends */}

                        {/* cart items offer start */}
                        <div className="cartItemsOfferSection">
                            <div className="cartItemsOfferHeader">
                                <img src="https://cdn-icons-png.flaticon.com/128/879/879757.png" alt="" className="cartItemOfferImage" />
                                <h3 className="cartItemOfferHeading">Available Offers</h3>
                            </div>
                            <div className={showMore ? 'availableOffersSection showMoreAlso' : "availableOffersSection"}>
                                <div className="availableOffersdiv">- 10% Instant Discount with HDFC Bank Credit Cards on a min spend of Rs 3,000. TCA</div>
                                <div className="availableOffersdiv">- 10% Instant Discount with HDFC Bank Credit Cards on a min spend of Rs 3,000. TCA</div>
                                <div className="availableOffersdiv">- 10% Instant Discount with HDFC Bank Credit Cards on a min spend of Rs 3,000. TCA</div>
                            </div>
                            <div className="availableOffersButton" onClick={() => setShowMore(prevState => !prevState)}>Show more</div>
                        </div>
                        {/* cart items offers ends */}

                        {/* loader starts */}
                        {
                            cartItems.length === 0 ? (
                                <div className="noItemsContainer">
                                    <Loader type='Bars' color='skyblue' width='100' height='100' />
                                </div>
                            ) : (
                                <div className="cartItemsContainer">
                                    {emptyCart && <div className="emptyCartItems">There are no items, Please, Start by adding some!</div> }
                                    {
                                        cartItems.map(item => {
                                            return (
                                                <CartItem key={item.id} title={item.title} imageUrl={item.imageUrl} description={item.description} color={item.color} quantity={item.quantity} price={item.price} id={item.id} productId={item.productId} />
                                            )
                                        })
                                    }
                                </div>
                            )
                        }

                        {/* cart items container */}
                       
                    </div>
                    <div className='verticalLine' />
                    <div className="cartSummary">
                        <div className="cartSummaryHeading">CART SUMMARY</div>
                        <div className="cartItemInfoDetails">{`PRICE DETAILS (${!(totalNumbers === isNaN) ? totalNumbers : 'no'} item)`}</div>
                        <div className="cartItemInfo">
                            <div className="cartItemInfoLine"><span className="cartItemInfoSpan">Total MRP</span><span className="cartItemInfoAmountSpan">$ {totalAmount.toFixed(2)}</span></div>

                            <div className="cartItemInfoLine"><span className="cartItemInfoSpan">Discount on MRP</span><span className="cartItemInfoAmountSpan">-$ {(totalAmount * 0.1)?.toFixed(2)}</span></div>

                            <div className="cartItemInfoLine"><span className="cartItemInfoSpan">Coupon Discount</span><span className="cartItemInfoAmountSpan"><Link >Apply Coupon </Link></span></div>

                            <div className="cartItemInfoLine"><span className="cartItemInfoSpan">Convenience Fee</span><span className="cartItemInfoAmountSpan">$ {(totalAmount * 0.2)?.toFixed(2)}</span></div>
                        </div>
                        <hr className='summaryHr' />
                        <div className="cartItemTotal"><span className="cartItemInfoSpan">Total Amount</span><span className="cartItemInfoAmountSpan">$ {(totalAmount * 0.99)?.toFixed(2)}</span></div>

                        <div className="cartItemPlaceOrder">PLACE ORDER</div>
                    </div>  
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Cart;