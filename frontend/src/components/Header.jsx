import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from './CartContext'
function Header() {
    const { totalItem } = useContext(CartContext)
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
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" id="navbarDropdown_1"
                                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Shop
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown_1">
                                                <Link className="dropdown-item" to="/shopcategory">Shop Category</Link>
                                                {/* <Link className="dropdown-item" to="/singleproduct">Product Details</Link> */}
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" id="navbarDropdown_3"
                                                role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                pages
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown_2">
                                                <Link className="dropdown-item" to="/login">login</Link>
                                                <Link className="dropdown-item" to="/tracking">tracking</Link>
                                                <Link className="dropdown-item" to="/checkout">product checkout</Link>
                                                <Link className="dropdown-item" to="/cart">shopping cart</Link>
                                                <Link className="dropdown-item" to="/confirmation">confirmation</Link>
                                                {/* <Link className="dropdown-item" to="/elements">elements</Link> */}
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
                                <div className="hearer_icon d-flex"> {/*onClick={() => document.getElementById('search_input_box').style.display = 'block'}*/}
                                    <button id="search_1">
                                        <i className="ti-search"></i>
                                    </button>
                                    <a href=""><i className="ti-heart"></i></a>

                                    <div className="cart">
                                        <Link to="/cart">
                                            <i className="fas fa-shopping-cart" data-count={totalItem}></i>
                                        </Link>
                                    </div>

                                    {/*<div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <div className="single_product">

                                </div>
                            </div>*/}
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
                {/* <div className="search_input" id="search_input_box">
        <div className="container ">
            <form className="d-flex justify-content-between search-inner">
                <input type="text" className="form-control" id="search_input" placeholder="Search Here"/>
                <button type="submit" className="btn"></button>
                <span className="ti-close" id="close_search" title="Close Search"></span>
            </form>
        </div>
    </div> */}
            </header>
            {/* Header part end*/}
        </>
    )
}

export default Header