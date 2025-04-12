import React from 'react'
import Nav from '../admin/include/Nav'
import Navsidebar from '../admin/include/Navsidebar'
import Footer from '../admin/include/Footer'


function Categories () {
    return(
        <>
            <div class="container-scroller">
                <Nav/>
                <div class="container-fluid page-body-wrapper">
                    <Navsidebar/>
                    <div class="main-panel">
                        <div class="container-fluid page-body-wrapper">
                            <h1>Categories</h1>
                        </div>
                    <Footer/>    
                    </div>
                </div>
            </div>
        </>
    )
}
export default Categories

