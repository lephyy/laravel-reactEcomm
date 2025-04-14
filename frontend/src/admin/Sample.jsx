import React from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'



const Sample = () => {
    return(
        <div class="container-scroller">
            <Nav/>
            <div class="container-fluid page-body-wrapper">
                <Navsidebar/>
                <div class="main-panel">
                    <div class="container-fluid page-body-wrapper">
                    <div class="container mt-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h2 class="text-uppercase">Categories</h2>
                            <button class="btn btn-success">+ Create Category</button>
                        </div>
                        <table class="table table-striped table-bordered table-hover">
                        <thead class="table-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Electronics</td>
                            <td>Devices and gadgets</td>
                            <td>
                                <button class="btn btn-sm btn-primary">Edit</button>
                                <button class="btn btn-sm btn-danger">Delete</button>
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Clothing</td>
                            <td>Men & Women apparel</td>
                            <td>
                                <button class="btn btn-sm btn-primary">Edit</button>
                                <button class="btn btn-sm btn-danger">Delete</button>
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Books</td>
                            <td>Educational and leisure reading</td>
                            <td>
                                <button class="btn btn-sm btn-primary">Edit</button>
                                <button class="btn btn-sm btn-danger">Delete</button>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                    </div>
                <Footer/>    
                </div>
            </div>
        </div>
    )
}

export default Sample