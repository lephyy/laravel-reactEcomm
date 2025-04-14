import React, { useEffect } from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'
import { Link } from 'react-router-dom'
import { adminToken, apiUrl} from '../http'

const Show = () => {

    const fetchCategories = async () => {
        const res = await fetch(`${apiUrl}/categories`,{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                // 'Authorization' : `Bearer ${adminToken}`
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result)
        })
    }

    useEffect(() => {
        fetchCategories()
    },[])


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
                            <button class="btn btn-success">+ Create </button>
                        </div>
                        <table class="table table-striped table-bordered table-hover">
                        <thead class="table-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>BlindBox</td>
                            <td> 
                                <span className='badge badge-success'>Action</span>
                            </td>
                            <td>
                            <div class="d-flex" style={{gap: '10px'}}>
                                <Link>
                                    <button class="btn btn-sm btn-primary">Edit</button>
                                </Link>
                                <Link>
                                    <button class="btn btn-sm btn-danger">Delete</button>
                                </Link>
                            </div>
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">2</th>
                            <td>Clothing</td>
                            <td>Men & Women apparel</td>
                            <td>
                            <div class="d-flex" style={{gap: '10px'}}>
                                <button class="btn btn-sm btn-primary">Edit</button>
                                <button class="btn btn-sm btn-danger">Delete</button>
                            </div>
                                
                            </td>
                            </tr>
                            <tr>
                            <th scope="row">3</th>
                            <td>Books</td>
                            <td>Educational and leisure reading</td>
                            <td>
                            <div class="d-flex" style={{gap: '10px'}}>
                                <button class="btn btn-sm btn-primary">Edit</button>
                                <button class="btn btn-sm btn-danger">Delete</button>
                            </div>
                                
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

export default Show