import React, { useEffect, useState, useRef, useMemo } from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import JoditEditor from 'jodit-react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { adminToken, apiUrl } from '../http'

function Edit ({ placeholder }) {

const editor = useRef(null);
    const [content, setContent] = useState('');
    const [disable, setDisable] = useState(false)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [productImages, setProductImages] = useState([])
    const navigate = useNavigate();
    const params = useParams();


    const config = useMemo(() => ({
            readonly: false, // all options from https://xdsoft.net/jodit/docs/,
            placeholder: placeholder || ''
        }),
        [placeholder]
    );
   
    const {
        register,
        handleSubmit,
        watch,
        setError,
        reset,
        formState: { errors },
      } = useForm({
        defaultValues: async () => {
            const res = await fetch(`${apiUrl}/products/${params.id}`,{
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer  ${adminToken()}`
                },
                
            }).then(res => res.json())
            .then(result => {
                setProductImages(result.data.product_images)
                reset({
                    title: result.data.title,
                    category: result.data.category_id,
                    brand: result.data.brand_id,
                    sku: result.data.sku,
                    qty: result.data.qty,
                    short_description: result.data.short_description,
                    description: result.data.description,
                    price: result.data.price,
                    compare_price: result.data.compare_price,
                    barcode: result.data.barcode,
                    status: result.data.status,
                    is_featured: result.data.is_featured,
                })
            })
        }
      });

    const saveProduct = async (data) => {
        const FormData = {...data, "description": content}
                                  
        setDisable(true);
        console.log(data)
        const res = await fetch(`${apiUrl}/products/${params.id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer  ${adminToken()}`
                    },
                    body: JSON.stringify(FormData)
                }).then(res => res.json())
                .then(result => {
                    setDisable(false);
                    if (result.status == 200) {
                        toast.success(result.message);
                        navigate('/admin/products')
                    }else{
                        const formErrors = result.errors;
                        Object.keys(formErrors).forEach((field) => {
                            setError(field, {messages: formErrors[field][0]});
                        })
                    }
                    
                })

    }

    const fetchCategories = async () => {
            const res = await fetch(`${apiUrl}/categories`,{
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer  ${adminToken()}`
                },
                
            }).then(res => res.json())
            .then(result => {
                setCategories(result.data)
                
            })
        }
    
        const fetchBrands = async () => {
            const res = await fetch(`${apiUrl}/brands`,{
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer  ${adminToken()}`
                },
                
            }).then(res => res.json())
            .then(result => {
                setBrands(result.data)
                
            })
        }
    
        // const handleFile = async (e) => {
        //     const formData = new FormData();
        //     const file = e.target.files[0];
        //     formData.append("image",file);
        //     setDisable(true)
    
    
        //     const res = await fetch(`${apiUrl}/save-product-image`,{
        //         method: 'POST',
        //         headers: {
        //             'Accept' : 'application/json',
        //             'Authorization' : `Bearer  ${adminToken()}`
        //         },
        //         body: formData
                
        //     })
        //     .then(res => res.json())
        //     .then(result => {

        //         if(result.status == 200) {
        //             productImages.push(result.data)
        //             setProductImages(productImages)
        //         } else {
        //             toast.error(result.errors.image[0]);
        //         }

        //         setDisable(false)
        //         e.target.value = ""
        //     })
        // }
        
        const handleFile = async (e) => {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append("image", file);
            // Include the product ID from the URL params
            formData.append("product_id", params.id);
            setDisable(true);
        
            try {
                const res = await fetch(`${apiUrl}/save-product-image`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${adminToken()}`
                    },
                    body: formData
                });
                
                const result = await res.json();
        
                if(result.status == 200) {
                    const newImages = [...productImages, result.data];
                    setProductImages(newImages);
                    toast.success("Image uploaded successfully");
                    
                } else {
                    if (result.errors && result.errors.image && result.errors.image[0]) {
                        toast.error(result.errors.image[0]);
                    } else {
                        toast.error(result.message || "Failed to upload image");
                    }
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error("An error occurred while uploading the image");
            } finally {
                setDisable(false);
                e.target.value = "";
            }
        }
        // Add the deleteImage function
        const deleteImage = async (id) => {
            if(window.confirm("Are you sure you want to delete?")) {
                const res = await fetch(`${apiUrl}/delete-product-image/${id}`,{
                    method: 'DELETE',
                    headers: {
                        'Content-type' : 'application/json',
                        'Accept' : 'application/json',
                        'Authorization' : `Bearer  ${adminToken()}`
                    },
                    
                }).then(res => res.json())
                .then(result => {
                    if (result.status == 200) {
                        const newProductImages = productImages.filter(productImages => productImages.id != id)
                        setProductImages(newProductImages)
                        toast.success(result.message)
                    } else {
                        toast.error(result.message)
                    }
                    
                })
            }
            
        }

        const changeImage = async (image) => {
            const res = await fetch(`${apiUrl}/change-product-default-image?product_id=${params.id}&image=${image}`,{
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer  ${adminToken()}`
                },
                
            }).then(res => res.json())
            .then(result => {
                if(result.status == 200){
                    toast.success(result.message)
                } else {
                    console.log("something went worng");
                }
                //setBrands(result.data)
                
            })
        }

    useEffect(() => {
        fetchCategories();
        fetchBrands();
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
                                    <h1 class="text-uppercase">Products / Edit</h1>
                                    <Link to="/admin/products" className="btn btn-success">Back</Link>
                                </div>
                                <form onSubmit={handleSubmit(saveProduct)}>
                                    <div class="mb-3">
                                        <label for="title" class="form-label">Title</label>
                                        <input 
                                            {
                                                ...register('title' , {
                                                    required : 'The title field is required'
                                                })
                                            }
                                            type="text" 
                                            className={`form-control ${errors.title && 'is-invalid'}`}  
                                            placeholder="Enter Title"/>
                                            {
                                                errors.title && 
                                                <p className='invalid-feedback'>{errors.title?.message}</p>
                                            }
                                    </div>
                                    <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label htmlFor="" className="form-label">Category</label>
                                                    <select
                                                    {
                                                        ...register('category' , {
                                                            required : 'The category field is required'
                                                        })
                                                    }
                                                    className={`form-control ${errors.category && 'is-invalid'}`}>

                                                        <option value="">Select a Category</option>
                                                        {
                                                            categories && categories.map((category) => {
                                                                return(
                                                                    <option key={`category-${category.id}`} value={category.id}>{category.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    {
                                                        errors.category && 
                                                        <p className='invalid-feedback'>{errors.category?.message}</p>
                                                    }
                                                </div>  
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label htmlFor="" className="form-label">Brand</label>
                                                    <select 
                                                    {
                                                        ...register('brand' , {
                                                            required : 'The brand field is required'
                                                        })
                                                    }
                                                    className="form-control" id="" >
                                                        <option value="">Select a Brand</option>
                                                        {
                                                            brands && brands.map((brand) => {
                                                                return(
                                                                    <option key={`brand-${brand.id}`} value={brand.id}>{brand.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                    {
                                                        errors.brand && 
                                                        <p className='invalid-feedback'>{errors.brand?.message}</p>
                                                    }
                                                </div>  
                                            </div>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="" className='form-label'>
                                            Short Description
                                        </label>
                                        <textarea 
                                        {
                                            ...register('short_description')
                                        }
                                        className='form-control' placeholder='Short Description' rows={3}></textarea>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="" className='form-label'>Description</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                            onChange={newContent => {}}
                                        />
                                    </div>
                                    <h3 className='py-3 border-bottom mb-3'>Pricing</h3>
                                    <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label htmlFor="" className="form-label">Price</label>
                                                    <input 
                                                    {
                                                        ...register('price' , {
                                                            required : 'The price field is required'
                                                        })
                                                    }
                                                    className={`form-control ${errors.price && 'is-invalid'}`}
                                                    type="text" placeholder='Price'/>
                                                    {
                                                        errors.price && 
                                                        <p className='invalid-feedback'>{errors.price?.message}</p>
                                                    }
                                                </div>  
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label htmlFor="" className="form-label">Discount Price</label>
                                                    <input 
                                                    {
                                                        ...register('compare_price')
                                                    }
                                                    type="text"className="form-control" placeholder='Discount Price' />
                                                </div>  
                                            </div>
                                    </div>
                                    <h3 className='py-3 border-bottom mb-3'>Inventory</h3>
                                    <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label htmlFor="" className="form-label">SKU</label>
                                                    <input 
                                                    {
                                                        ...register('sku' , {
                                                            required : 'The sku field is required'
                                                        })
                                                    }
                                                    className={`form-control ${errors.sku && 'is-invalid'}`}
                                                    type="text" placeholder='SKU'/>
                                                    {
                                                        errors.sku && 
                                                        <p className='invalid-feedback'>{errors.sku?.message}</p>
                                                    }
                                                </div>  
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label htmlFor="" className="form-label">Barcode</label>
                                                    <input 
                                                    {
                                                        ...register('barcode')
                                                    }
                                                    type="text"className="form-control" placeholder='Barcode' />
                                                </div>  
                                            </div>
                                    </div>
                                    <div className='row'>
                                            <div className='col-md-6'>
                                                <div className='mb-3'>
                                                    <label
                                                    htmlFor="" className="form-label">QTY</label>
                                                    <input 
                                                    {
                                                        ...register('qty')
                                                    }
                                                    type="text" className="form-control" placeholder='QTY'/>
                                                </div>  
                                            </div>
                                            <div className='col-md-6'>
                                                <div class="mb-3">
                                                    <label for="brandStatus" className="form-label">Status</label>
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
                                            </div>
                                    </div>
                                    
                                                <div class="mb-3">
                                                    <label for="brandStatus" className="form-label">Featured</label>
                                                    <select 
                                                        {
                                                            ...register('is_featured' , {
                                                                required : 'Please selete a featured'
                                                            })
                                                        }
                                                        className={`form-control ${errors.is_featured && 'is-invalid'}`}  
                                                     >
                                                        <option value="yes">Yes</option>
                                                        <option value="no">No</option>
                                                    </select>
                                                        {
                                                            errors.is_featured && 
                                                            <p className='invalid-feedback'>{errors.is_featured?.message}</p>
                                                        }
                                                </div> 

                                    
                                    <h3 className='py-3 border-bottom mb-3'>Gallery</h3>
                                    <div className="mb-3">
                                        <label htmlFor="formFile" className="form-label">Image</label>
                                        <input 
                                        onChange={handleFile}
                                        className="form-control" type="file"  />
                                    </div>
                                    <div className='mb-3'>
                                        <div className='row'>
                                            {/* {
                                                productImages && productImages.map((productImage,index) => {
                                                    return (
                                                        <div className='col-md-3' key={`image-${index}`}>
                                                            <div className='card shadow'>
                                                                <img src={productImage.image_url} alt="" className='w-100' />
                                                                <button 
                                                                    type="button" 
                                                                    className='btn btn-danger' 
                                                                    onClick={() => deleteImage(productImage)}>
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            } */}
                                            {
                                                productImages && productImages.length > 0 && productImages.map((productImage, index) => {
                                                    // Skip rendering if productImage or image_url is undefined
                                                    if (!productImage || !productImage.image_url) return null;
                                                    
                                                    return (
                                                        <div className='col-md-3' key={`image-${index}`}>
                                                            <div className='card shadow'>
                                                                <img src={productImage.image_url} alt="" className='w-100' />
                                                                
                                                            </div>
                                                            <button 
                                                                    type="button" 
                                                                    className='btn btn-danger mt-3 mx-3' 
                                                                    onClick={() => deleteImage(productImage.id)}>
                                                                    Delete
                                                                </button>
                                                                <button 
                                                                    type="button" 
                                                                    className='btn btn-dark mt-3 ' 
                                                                    onClick={() => changeImage(productImage.image)}>
                                                                    Set as default
                                                                </button>
                                                        </div>
                                                    )
                                                })
                                            }
                                            
                                        </div>
                                    </div>
                                    <br />
                                    <button 
                                        disabled={disable}
                                        type="submit" class="btn btn-success">Update Product
                                    </button>
                                </form>
                                <br />
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