import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const UserSidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/account/login');
    };
    return (
        <>
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
            <ul class="nav">
            <li class="nav-item nav-profile">
                <div class="nav-link">
                <h3>My Account</h3>
                </div>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to='#'>
                    <i class="fa-solid fa-pager menu-icon"></i>
                    <span class="menu-title">Orders</span>       
                </Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/admin/banner">
                    <i class="fa-solid fa-pager menu-icon"></i>
                    <span class="menu-title">Shipping</span>       
                </Link>
            </li>
            <li class="nav-item">
                <Link className="nav-link" to="/admin/banner">
                    <i class="fa-solid fa-pager menu-icon"></i>
                    <span class="menu-title">Change Password</span>       
                </Link>
            </li>
            <br />
            <li class="nav-item">
                
                <a class="nav-link" href="#" onClick={handleLogout}>
                   Log out
                </a>
            </li>
            
            </ul>
        </nav>
        </>
    )
}

export default UserSidebar