import React, { useEffect, useState, useRef, useMemo } from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { adminToken, apiUrl } from '../http'
import JoditEditor from 'jodit-react';



function Create ({ placeholder }) {
    const editor = useRef(null);
	const [content, setContent] = useState('');
    const [disable, setDisable] = useState(false)
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [gallery, SetGallery] = useState([])
    const [galleryImages, setGalleryImages] = useState([])
    const navigate = useNavigate();


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
        formState: { errors },
      } = useForm();

    const saveProduct = async (data) => {
        const FormData = {...data, "description": content, "gallery": gallery}
                                  
        setDisable(true);
        console.log(data)
        const res = await fetch(`${apiUrl}/products`,{
                    method: 'POST',
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
                        //console.log("Something went wrong");
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

    const handleFile = async (e) => {
        const formData = new FormData();
        const file = e.target.files[0];
        formData.append("image",file);
        setDisable(true)


        const res = await fetch(`${apiUrl}/temp-image`,{
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Authorization' : `Bearer  ${adminToken()}`
            },
            body: formData
            
        })
        .then(res => res.json())
        .then(result => {
            gallery.push(result.path.id); 
            SetGallery(gallery)

            galleryImages.push(result.path.image_url);
            setGalleryImages(galleryImages)
            setDisable(false)
            
        })
    }

    const deleteImage = (image) => {
        const newGallery = galleryImages.filter(gallery => gallery != image)
        setGalleryImages(newGallery)
    }

    // const handleFile = async (e) => {
    //     const formData = new FormData();
    //     const file = e.target.files[0];
    //     formData.append("image", file);
    //     setDisable(true);
    
    //     try {
    //         const res = await fetch(`${apiUrl}/temp-image`, {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Authorization': `Bearer ${adminToken()}`
    //             },
    //             body: formData
    //         });
            
    //         const result = await res.json();
            
    //         // The ID is in result.path.id
    //         if (result && result.path && result.path.id) {
    //             const newGallery = [...gallery, result.path.id];
    //             SetGallery(newGallery);
    //             toast.success("Image uploaded successfully");
    //         } else {
    //             console.error("Invalid response format:", result);
    //             toast.error("Failed to get image ID from response");
    //         }
    //     } catch (error) {
    //         console.error("Error uploading image:", error);
    //         toast.error("Failed to upload image");
    //     } finally {
    //         setDisable(false);
    //     }
    // };

    


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
                                    <h1 class="text-uppercase">Products / Create</h1>
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
                                                        <option value="1">Yes</option>
                                                        <option value="0">No</option>
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
                                            {
                                                galleryImages && galleryImages.map((image,index) => {
                                                    return (
                                                        <div className='col-md-3' key={`image-${index}`}>
                                                            <div className='card shadow'>
                                                                <img src={image} alt="" className='w-100' />
                                                                
                                                            </div>
                                                            <button className='btn btn-danger mt-3' onClick={() => deleteImage(image)}>Delete</button>
                                                        </div>
                                                    )
                                                })
                                            }
                                            
                                        </div>
                                    </div>
                                    <br />
                                    <button 
                                        disabled={disable}
                                        type="submit" class="btn btn-success">Create Product
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
export default Create


