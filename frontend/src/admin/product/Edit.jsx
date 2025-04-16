import React from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'


function Edit () {
    return(
        <>
            <div class="container-scroller">
                <Nav/>
                <div class="container-fluid page-body-wrapper">
                    <Navsidebar/>
                    <div class="main-panel">
                        <div class="container-fluid page-body-wrapper">
                            <h1>Product</h1>
                        </div>
                    <Footer/>    
                    </div>
                </div>
            </div>
        </>
    )
}
export default Edit


