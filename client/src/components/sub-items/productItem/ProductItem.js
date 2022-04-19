import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './productItem.css';
import { addToCart } from '../../../redux/actions/cartActions';
import OverlayLogin from '../../overlayLogin/OverlayLogin';

const ProductItem = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const product = products.find(prod => prod.id === props.id);
    const user = useSelector(state => state.auth.user);
    
    const [overlayTrue, setOverlayTrue] = useState(false);
    
    const addToCartHandler = () => {
        if(!user) {
            setOverlayTrue(true);
            return;
        }
        dispatch(addToCart(product));
    };
    return (
        
        <div className='productItem-section' >
           <div className="imageContainer">
               <img src={props.imageUrl} className='image' alt="" />
           </div>
           <div className="infoContainer">
               <div className="title">{props.title}</div>
               <div className="description">{props.description?.slice(0, 30)}...</div>
               <div className="price">$ {props.price}</div>

                
           </div>
           <OverlayLogin overlayTrue={overlayTrue} setOverlayTrue={setOverlayTrue} />
           <div className="button-container">
               <Link to={`productdetailpage/${props.id}`} ><button className="productItem-button">View Details</button></Link>
               <button className='productItem-button' onClick={addToCartHandler}>Add to Cart</button>
           </div>
            
        </div>
        
    )
}

export default ProductItem;
