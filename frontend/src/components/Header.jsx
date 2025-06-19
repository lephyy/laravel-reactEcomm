import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { useAuth } from './Auth';

function Header() {
    const { totalItem, cart, setCart} = useContext(CartContext);
    const { user, logout, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    setCart(JSON.parse(storedCart));
  } else {
    setCart([]);
  }
}, []);

    if (loading) {
        return (
            <header className="main_menu home_menu">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <a className="navbar-brand" href="/"> 
                                    <img src="assets/img/logo.png" alt="logo" /> 
                                </a>
                                <div className="d-flex align-items-center gap-3">
                                    <span>Loading...</span>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <>
            {/*::header part start::*/}
            <header className="main_menu home_menu">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <a className="navbar-brand" href="/"> <img src="assets/img/logo.png" alt="logo" /> </a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="menu_icon"><i className="fas fa-bars"></i></span>
                                </button>

                                <div className="collapse navbar-collapse main-menu-item" id="navbarSupportedContent">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/">
                                                Home
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/shopcategory">Shop</Link>
                                        </li>
                                        
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" id="navbarDropdown_3"
                                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                pages
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown_2">
                                                <Link className="dropdown-item" to="/account/login">login</Link>
                                                <Link className="dropdown-item" to="/account/register">Register</Link>
                                                <Link className="dropdown-item" to="/account">Account</Link>
                                                <Link className="dropdown-item" to="/tracking">tracking</Link>
                                                <Link className="dropdown-item" to="/checkout">product checkout</Link>
                                                <Link className="dropdown-item" to="/cart">shopping cart</Link>
                                                <Link className="dropdown-item" to="/confirmation">confirmation</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" id="navbarDropdown_2"
                                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                blog
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown_2">
                                                <Link className="dropdown-item" to="/blog">blog</Link>
                                                <Link className="dropdown-item" to="/singleblog">Single blog</Link>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/contact">Contact</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/history">History</Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <button id="search_1" className="btn p-0">
                                        <i className="ti-search"></i>
                                    </button>
                                    <a href="#" className="btn p-0">
                                        <i className="ti-heart"></i>
                                    </a>
                                
                                        <div className="cart">
                                        <Link to="/cart" className="btn p-0 position-relative">
                                            <i className="fas fa-shopping-cart" data-count={totalItem}></i>
                                        </Link>
                                    </div>
                                    
                                   
                                    <div className="dropdown">
                                        <button
                                            className="btn dropdown-toggle"
                                            type="button"
                                            id="userDropdown"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="fa-regular fa-circle-user me-5"></i>
                                            {isAuthenticated ? user?.name || 'User' : 'Account'}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="userDropdown">
                                            {!isAuthenticated ? (
                                            <>
                                                <li>
                                                    <Link className="dropdown-item" to="/account/login">Login</Link>
                                                </li>
                                                <li>
                                                    <Link className="dropdown-item" to="/account/register">Register</Link>
                                                </li>
                                            </>
                                            ) : (
                                            <>
                                                <li>
                                                    <Link className="dropdown-item" to="/account/profile">Profile</Link>
                                                </li>
                                                <li>
                                                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                                                </li>
                                            </>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
            {/* Header part end*/}
        </>
    )
}
export default Header;