import React from 'react';
import { Link } from 'react-router-dom';

import ProductItem from '../sub-items/productItem/ProductItem';
import './homeCategory.css';

const HomeCategory = props => {
    return (
        <div className='homeCategory-section'>
            <Link to={`/productspage/${props.heading}`} style={{textDecoration: 'none', }} >
                <div className="heading">
                    {props.heading}
                </div>
           </Link>
           <div className="underline"></div>
           <div className="homeCategory-products">
           {
               props.products.map(product => {
                   return (<ProductItem key={product.id} imageUrl={product.imageUrl} title={product.title} description={product.description} price={product.price} id={product.id} /> )
               })
           }
            </div>

           {
               !props.productsPage && <div className='viewMoreButtonContainer'>
                   <Link to={`/productspage/${props.heading}`} style={{textDecoration: 'none', }} >
                    <button className='viewMoreButton' >View all products</button>
                    </Link>
                </div>
           }
            
        </div>
    )
}

export default HomeCategory;
