import React from 'react';
import { BiSearch } from 'react-icons/bi';
import './categoriesPage.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import ProductItem from '../../components/sub-items/productItem/ProductItem';

const CategoriesPage = () => {
    const location = useLocation();
    const category = location.search.split('=')[1];
    const products = useSelector(state => state.products.products);
    

    let filteredProducts = [];
    if(category) {
        filteredProducts = products.filter(product => product.category === category);
    }else {
        filteredProducts = products
    }
    
    return (
        <>
            <Navbar />
            <div className='categoriesPageSection' >
                <div className="categoriesPageWrapper">
                    {/* search container starts */}
                    <div className="categoriesPageSearchContainer">
                        <BiSearch className='categoriesPageSearchIcon' />
                        <input type="text" className="searchInput" placeholder='Search Your own Category...' />
                    </div>
                    {/* search container ends */}

                    {/* categories options starts */}
                    <div className="categoriesOptions">
                        <span className="categoriesOptionsSpan">Fashion</span>
                        <span className="categoriesOptionsSpan">Home Designing</span>
                        <span className="categoriesOptionsSpan">Electronics</span>
                        <span className="categoriesOptionsSpan">Beauty</span>
                        <span className="categoriesOptionsSpan">Men</span>
                        <span className="categoriesOptionsSpan">Women</span>
                        <span className="categoriesOptionsSpan">Kids</span>
                        <span className="categoriesOptionsSpan">Make Over</span>
                        <span className="categoriesOptionsSpan">Footwears</span>
                        <span className="categoriesOptionsSpan">Skin Care</span>
                        <span className="categoriesOptionsSpan">Home Decor</span>
                        <span className="categoriesOptionsSpan">Kitchen</span>
                        <span className="categoriesOptionsSpan">Appliances</span>
                        <span className="categoriesOptionsSpan">Sports and Active Wear</span>
                        <span className="categoriesOptionsSpan">Lamps and Lighting</span>
                    </div>
                    {/* categories options ends */}

                    {/* categories page results starts*/}
                    <div className="categoriesPageResults">
                        { filteredProducts.length === 0 ? <div className="noResultFoundContainer">No Products found! View Your filters!</div> :
                            filteredProducts.map(product => {
                                return (
                                    <ProductItem key={product.id} imageUrl={product.imageUrl} title={product.title} description={product.description} price={product.price} id={product.id} />
                                )
                            })
                        }
                    </div>

                    <Footer />
                </div>
            </div>
        </>
    )
}

export default CategoriesPage;