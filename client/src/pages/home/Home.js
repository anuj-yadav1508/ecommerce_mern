import React, { useEffect } from 'react';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import Navbar from '../../components/navbar/Navbar';
import Slider from '../../components/slider/Slider';
import HomeCategory from '../../components/home-category/HomeCategory';
import Footer from '../../components/footer/Footer';
import { getServerProducts } from '../../redux/actions/productActions';
import { getCarts } from '../../redux/actions/cartActions';

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const user = useSelector(state => state.auth.user);

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

    useEffect(() => {
        const fetchCarts = async () => {
            try {
                await dispatch(getCarts());
            } catch (err) {
                console.log(err.message);
            }
        }

        user && fetchCarts();
    }, [user, dispatch]);

    return (
        <>
        <Navbar />
            <div className='home-section'>
                <div className="slider-wrapper">
                    <Slider />
                </div>
                

                <div className="click-category">
                    <Link to='/categoriespage' style={{color: 'black'}} >
                    Click here to Search through Categories...
                    </Link>
                </div>

             { products.length === 0 ? <div className='loaderContainer'><Loader type="Bars"
        color="#00BFFF"
        height={100}
        width={100} /></div> : (
            <>
            <HomeCategory heading='Top Rated Products' products={products} />
               <HomeCategory heading='Best Offer Deals' products={products} />
               <HomeCategory heading='Best Celebration Deals' products={products} />
               <HomeCategory heading='Best of Fashion' products={products} />
               <HomeCategory heading='Best of Home Designing' products={products} />
               </>
        ) }

               

               <Footer />
            </div>
        </>
    )
}

export default Home;
