import React from 'react';
import './navbar.css';
import { BiShoppingBag } from 'react-icons/bi';
// import { MdOutlinePersonOutline } from 'react-icons/md';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/authActions';

const Navbar = () => {
    const dispatch = useDispatch();
   
    const cartItems = useSelector(state => state.cart.items);
    const itemNumber = cartItems?.length;
    const user = useSelector(state => state.auth.user);

    const logoutHandler = () => {
        dispatch(logout());
        window.location.reload();
    };

    return (
        <div className='navbar-section'>
            <div className="navbar-wrapper">
                {/* logo starts */}
                <Link to='/'>
                <div className="navbar-logo-container">
                    <h1 className="navbar-logo">DailyShop</h1>
                </div>
                </Link>
                {/* logo ends */}

                {/* categories starts */}
                <div className="navbar-categories">
                    <span className="navbar-category-span">
                        <Link to='/categoriespage?category=fashion' style={{color:'black'}}>
                            Fashion
                        </Link>
                    </span>

                    <span className="navbar-category-span">
                        <Link to='/categoriespage?category=electronics' style={{color:'black'}}>
                            Electronics
                        </Link>
                    </span>

                    <span className="navbar-category-span">
                        <Link to='/categoriespage?category=books' style={{color:'black'}}>
                            Books
                        </Link>
                    </span>

                    <span className="navbar-category-span">
                        <Link to='/categoriespage?category=beauty' style={{color:'black'}}>
                            Beauty
                        </Link>
                    </span>
                </div>
                {/* categories end */}

                {/* search bar starts */}
                <div className="navbar-searchbar-container">
                    <FaSearch className='navbar-search-icon' />
                    <input type="text" className="navbar-search" placeholder='Search Your Products...' />
                </div>
                {/* navbar search ends */}

                {/* navbar profile */}
                {
                    user ? (
                            <div className="navbarProfileContainer">
                            <div className="profileImageContainer">
                                <img src={user.userProfilePicture} alt="" className="profilePicture" />
                            </div>

                            <span className="profile-span" onClick={logoutHandler}>Logout({user.userName})</span>
                        </div>
                    )
                    :
                    (
                            <div className="navbar-profile-container">
                            <Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
                                <span className="profile-span">Login</span>
                            </Link>
                            <Link to='/register' style={{ textDecoration: 'none', color: 'black' }}>
                                <span className="profile-span">Register</span>
                            </Link>
                        </div> 
                    )
                }
                {/* navbar profile ends */}

                {/* navbar-icons starts */}
                <div className="navbar-icons-container">
                    <span className="navbar-icons-span withBadge">
                        <div className="bagSpan">{itemNumber}</div>
                        <Link to='/cart/user' style={{color: 'black'}}>
                        <BiShoppingBag className='navbar-icon' />
                        </Link>
                    </span>
                    {/* <span className="navbar-icons-span">
                        <MdOutlinePersonOutline className='navbar-icon' />
                    </span> */}
                </div>
            </div>
        </div>
    )
}

export default Navbar;
