import React from 'react'
import { Link } from 'react-router-dom'


function Navsidebar () {
    return(
        <>
        <nav class="sidebar sidebar-offcanvas" id="sidebar">
        <ul class="nav">
          <li class="nav-item nav-profile">
            <div class="nav-link">
              <div class="profile-name">
                <p class="name">
                    Admin Panel
                </p>
              </div>
            </div>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin">
                <i class="fa-solid fa-pager menu-icon"></i>
                <span class="menu-title">Dashboard</span>       
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin/categories">
                <i class="fa-solid fa-layer-group"></i>
                <span class="menu-title ml-4">Categories</span>       
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin/brands">
                <i class="fa-solid fa-bookmark mr-2"></i>
                <span class="menu-title ml-4">Brands</span>       
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin/products">
                <i class="fa-solid fa-shop"></i>
                <span class="menu-title ml-4">Products</span>       
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin/banner">
                <i class="fa-solid fa-bag-shopping"></i>
                <span class="menu-title ml-4">Orders</span>       
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin/banner">
                <i class="fa-solid fa-circle-user"></i>
                <span class="menu-title ml-4">Users</span>       
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin/banner">
                <i class="fa-solid fa-truck "></i>
                <span class="menu-title ml-4">Shipping</span>       
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin/banner">
                <i class="fa-solid fa-unlock-keyhole"></i>
                <span class="menu-title ml-4">Change Password</span>       
            </Link>
          </li>
          
          
        
        </ul>
        </nav>
        </>
    )
}
export default Navsidebar

