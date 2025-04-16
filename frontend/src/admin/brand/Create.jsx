import React, { useState } from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { adminToken, apiUrl } from '../http'


const Create = () => {
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();

    const saveBrand = async (data) => {
        setDisable(true);
        console.log(data)
        const res = await fetch(`${apiUrl}/brands`,{
                    method: 'POST',
                    headers: {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer  ${adminToken()}`
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json())
                .then(result => {
                    setDisable(false);
                    if (result.status == 200) {
                        toast.success(result.message);
                        navigate('/admin/brands')
                    }else{
                        console.log("Something went wrong");
                    }
                    
                })

    }
    
    return (
        <>
            <div class="container-scroller">
                <Nav/>
                <div class="container-fluid page-body-wrapper">
                    <Navsidebar/>
                    <div class="main-panel">
                        <div class="container-fluid page-body-wrapper">
                            <div class="container mt-5">
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <h1 class="text-uppercase">Brands / Create</h1>
                                    <Link to="/admin/brands" className="btn btn-success">Back</Link>
                                </div>
                                <form onSubmit={handleSubmit(saveBrand)}>
                                    <div class="mb-3">
                                        <label for="brandName" class="form-label">Brand Name</label>
                                        <input 
                                            {
                                                ...register('name' , {
                                                    required : 'The name field is required'
                                                })
                                            }
                                            type="text" 
                                            className={`form-control ${errors.name && 'is-invalid'}`}  
                                            placeholder="Enter brand name"/>
                                            {
                                                errors.name && 
                                                <p className='invalid-feedback'>{errors.name?.message}</p>
                                            }
                                    </div>

                                    <div class="mb-3">
                                        <label for="brandStatus" class="form-label">Status</label>
                                        <select 
                                            {
                                                ...register('status' , {
                                                    required : 'Please selete a status'
                                                })
                                            }
                                            className={`form-control ${errors.status && 'is-invalid'}`}  
                                            id="brandStatus">
                                            <option value="1">Active</option>
                                            <option value="0">Block</option>
                                        </select>

                                            {
                                                errors.status && 
                                                <p className='invalid-feedback'>{errors.status?.message}</p>
                                            }
                                    </div>
                                    
                                    <button 
                                        disabled={disable}
                                        type="submit" class="btn btn-success">Create Brand
                                    </button>
                                </form>
                                
                            </div>
                        </div>
                    <Footer/>    
                    </div>
                </div>
            </div>
        </>
    )
}

export default Create