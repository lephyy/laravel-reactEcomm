import React, { useEffect, useState } from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'
import { adminToken, apiUrl } from '../http'
import { set } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'


const Show = () => {
    const [brands, setBrands] = useState([]);
    const fetchBrands = async () => {
        const res = await fetch(`${apiUrl}/brands`,{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer  ${adminToken()}`
            }
        }).then(res => res.json())
        .then(result => {
            if (result.status == 200) {
                setBrands(result.data);
            }else{
                console.log("Something went wrong");
            }
            
        })
    }


    const deleteBrand = async (id) => {

        if(window.confirm("Are you sure you want to delete?")) {
            const res = await fetch(`${apiUrl}/brands/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer  ${adminToken()}`
                }
            })
            .then(res => res.json())
            .then(result => {
                if (result.status == 200) {
                    const newBrands = brands.filter(brand => brand.id != id)
                    setBrands(newBrands);
                    toast.success(result.message)
                }else{
                    console.log("Something went wrong");
                }
                
            })
        }
    }




    useEffect(() => {
        fetchBrands()
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
                            <h2 class="text-uppercase">Brands</h2>
                            <Link to="/admin/brands/create" className="btn btn-success">Create</Link>
                            {/* <button class="btn btn-success">+ Create Brand</button> */}
                        </div>
                        {
                            brands && brands.length > 0 && 
                            <table class="table table-striped table-bordered table-hover">
                                <thead class="table-dark">
                                    <tr>
                                    <th scope="col" width="50">#</th>
                                    <th scope="col">Brand Name</th>
                                    <th scope="col" width="150">Status</th>
                                    <th scope="col" width="150">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        brands && brands.map(brand => {
                                            return (
                                                    <tr>
                                                    <th scope="row">{brand.id}</th>
                                                    <td>{brand.name}</td>
                                                    <td>
                                                        {
                                                            brand.status == 1 ? <span className='badge badge-success'>Active</span>
                                                            : <span className='badge badge-danger'>Block</span>
                                                        }
                                                    </td>
                                                    <td>
                                                        <div class="d-flex">
                                                            <Link to={`/admin/brands/edit/${brand.id}`}>
                                                                <button class="btn btn-sm btn-primary mr-2">
                                                                    <i class="bi bi-pencil"></i>
                                                                </button>
                                                            </Link>
                                                            <Link onClick={() => deleteBrand(brand.id)}>
                                                                <button class="btn btn-sm btn-danger">
                                                                    <i class="bi bi-trash"></i>
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                            </table>
                        }
                        
                    </div>
                    </div>
                <Footer/>    
                </div>
            </div>
        </div>
    )
}

export default Show