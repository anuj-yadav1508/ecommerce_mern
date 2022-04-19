import React, { useEffect } from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown,AiOutlineDelete } from 'react-icons/ai';
import './cartItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem, updateQuantity } from '../../../redux/actions/cartActions';

const CartItem = props => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    let product;
    product = products.find(prod => prod.id === props.productId);

    useEffect(() => {
        product = products.find(prod => prod.id === props.productId);
    },[ products]);

    console.log(props.id, products, product);

    const updateQuantityHandler = (direction) => {
        dispatch(updateQuantity(props.id, direction, product?.price));
    };

    return (
         <div className="cartItem">
            <div className="cartItemImageContainer">
                <img src={props.imageUrl} alt="" className="cartItemImage" />
            </div>
             <div className="cartItemInfoContainer">
                  <div className="cartItemTitle">{props.title}</div>                      
                  <div className="cartItemDescription">{props.description}</div>
                  <div className="cartItemSoldBy"><span className="cartItemSpan">Sold by:</span>{props.soldBy}</div>
                  <div className="cartItemAdditional">
                      <div className="cartItemColor"><span className="cartItemSpanAdditional">Color:</span>{props.color}</div>
                      <div className="cartItemQuantityContainer">
                          <span className="cartItemSpan">Qnty:</span>
                          <button className="cartItemQuantityButton"><AiOutlineArrowUp className='cartItemIcon' onClick={() => updateQuantityHandler('increase')} /></button>
                          <div className="cartItemQuantity">{props.quantity}</div>
                          <button className="cartItemQuantityButton"><AiOutlineArrowDown className='cartItemIcon' onClick={() => updateQuantityHandler('decrease')} /></button>
                      </div>
                  </div>
                      <div className="cartItemPrice">Price: <span className="cartItemPriceSpan">$ {props?.price}</span></div>

            </div>
            <div className="cartItemRemove"><AiOutlineDelete className='cartItemRemoveIcon' onClick={() => dispatch(deleteItem(props.id))} /></div>
        </div>
    )
}

export default CartItem;
