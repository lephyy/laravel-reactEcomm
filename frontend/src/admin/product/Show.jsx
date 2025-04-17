import React, { useEffect, useState } from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { adminToken, apiUrl } from '../http'



function Show () {

    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        const res = await fetch(`${apiUrl}/products`,{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer  ${adminToken()}`
            }
        }).then(res => res.json())
        .then(result => {
            console.log(result);
            if (result.status == 200) {
                setProducts(result.data);
            }else{
                console.log("Something went wrong");
            }
            
        })
    }


    const deleteProduct = async (id) => {

        if(window.confirm("Are you sure you want to delete?")) {
            const res = await fetch(`${apiUrl}/products/${id}`,{
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
                    const newProducts = products.filter(product => product.id != id)
                    setProducts(newProducts);
                    toast.success(result.message)
                }else{
                    console.log("Something went wrong");
                }
                
            })
        }
    }




    useEffect(() => {
        fetchProducts();
    },[])

    return(
        <>
            <div class="container-scroller">
                <Nav/>
                <div class="container-fluid page-body-wrapper">
                    <Navsidebar/>
                    <div class="main-panel">
                        <div class="container-fluid page-body-wrapper">
                        <div class="container mt-5">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h1 class="text-uppercase">Products </h1>
                                    <Link to="/admin/products/create" className="btn btn-success">Create</Link>
                                </div>
                                {
                                    products && products.length > 0 && 
                                    <table class="table table-striped table-bordered table-hover">
                                        <thead class="table-dark">
                                            <tr>
                                            <th scope="col" width="50">#</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Qty</th>
                                            <th scope="col">Sku</th>
                                            <th scope="col" width="150">Status</th>
                                            <th scope="col" width="150">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                products && products.map(product => {
                                                    return (
                                                            <tr>
                                                            <th scope="row">{product.id}</th>
                                                            <td>
                                                                {
                                                                    (product.image_url == "") ? <img src="https://placehold.co/50x50" /> :  <img src={product.image_url} alt="" width={50}/>
                                                                }
                                                                
                                                            </td>
                                                            <td>{product.title}</td>
                                                            <td>${product.price}</td>
                                                            <td>{product.qty}</td>
                                                            <td>{product.sku}</td>
                                                            <td>
                                                                {
                                                                    product.status == 1 ? <span className='badge badge-success'>Active</span>
                                                                    : <span className='badge badge-danger'>Block</span>
                                                                }
                                                            </td>
                                                            <td>
                                                                <div class="d-flex">
                                                                    <Link to={`/admin/brands/edit/${product.id}`}>
                                                                        <button class="btn btn-sm btn-primary mr-2">
                                                                            <i class="bi bi-pencil"></i>
                                                                        </button>
                                                                    </Link>
                                                                    <Link onClick={() => deleteProduct(product.id)}>
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
        </>
    )
}
export default Show


