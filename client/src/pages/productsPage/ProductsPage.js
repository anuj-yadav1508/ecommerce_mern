import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Footer from '../../components/footer/Footer';
import HomeCategory from '../../components/home-category/HomeCategory';
import Navbar from '../../components/navbar/Navbar';
import Loader from 'react-loader-spinner';

import './productsPage.css';

const ProductsPage = () => {
    const location = useLocation();
    const products = useSelector(state => state.products.products);
    const filterdProducts = products.splice(0, 1);

    return (
        <>
        <Navbar />
            <div className='productsPageSection'>
                { filterdProducts.length === 0 ? <div className='loaderContainer'>
                    <Loader type='Bars' color='#444' height={60} width={60} />
                </div> : <HomeCategory products={filterdProducts} heading={location.pathname.split('/')[2]} productsPage /> }
                
            </div>
        <Footer />
        </>
    )
}

export default ProductsPage
