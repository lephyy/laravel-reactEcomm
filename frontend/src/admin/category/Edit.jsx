import React, { useState } from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { adminToken, apiUrl } from '../http'


function Edit () {
        const [disable, setDisable] = useState(false)
        const [category, setCategory] = useState([])
        const navigate = useNavigate();
        const params = useParams();
        const {
            register,
            handleSubmit,
            watch,
            reset,
            formState: { errors },
          } = useForm({
            defaultValues: async () => {
                const res = await fetch(`${apiUrl}/categories/${params.id}`,{
                    method: 'GET',
                    headers: {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer  ${adminToken()}`
                    }
                })
                .then(res => res.json())
                .then(result => {
                    console.log(result);
                    if (result.status == 200) {
                        setCategory(result.data)
                        reset({
                            name: result.data.name,
                            status: result.data.status,
                        })
                    }else{
                        console.log("Something went wrong");
                    }
                    
                })
            }
          });
    
        const saveCategory = async (data) => {
            setDisable(true);
            const res = await fetch(`${apiUrl}/categories/${params.id}`,{
                        method: 'PUT',
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
                            navigate('/admin/categories')
                        }else{
                            console.log("Something went wrong");
                        }
                        
                    })
    
        }
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
                                    <h1 class="text-uppercase">Categories / Edit</h1>
                                    <Link to="/admin/categories" className="btn btn-success">Back</Link>
                                </div>
                                <form onSubmit={handleSubmit(saveCategory)}>
                                    <div class="mb-3">
                                        <label for="categoryName" class="form-label">Category Name</label>
                                        <input 
                                            {
                                                ...register('name' , {
                                                    required : 'The name field is required'
                                                })
                                            }
                                            type="text" 
                                            className={`form-control ${errors.name && 'is-invalid'}`}  
                                            placeholder="Enter category name"/>
                                            {
                                                errors.name && 
                                                <p className='invalid-feedback'>{errors.name?.message}</p>
                                            }
                                    </div>

                                    <div class="mb-3">
                                        <label for="categoryStatus" class="form-label">Status</label>
                                        <select 
                                            {
                                                ...register('status' , {
                                                    required : 'Please selete a status'
                                                })
                                            }
                                            className={`form-control ${errors.status && 'is-invalid'}`}  
                                            id="categoryStatus">
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
                                        type="submit" class="btn btn-success">Update</button>
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
export default Edit

