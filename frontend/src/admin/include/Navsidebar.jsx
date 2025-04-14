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
                <i class="fa-solid fa-pager menu-icon"></i>
                <span class="menu-title">Categories</span>       
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin/brands">
                <i class="fa-solid fa-pager menu-icon"></i>
                <span class="menu-title">Brands</span>       
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin/banner">
                <i class="fa-solid fa-pager menu-icon"></i>
                <span class="menu-title">Banner</span>       
            </Link>
          </li>
          <li class="nav-item">
            <Link className="nav-link" to="/admin/product">
                <i class="fa-solid fa-pager menu-icon"></i>
                <span class="menu-title">Product</span>       
            </Link>
          </li>
        
        </ul>
      </nav>
        </>
    )
}
export default Navsidebar

