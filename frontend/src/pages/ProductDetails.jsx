import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { CartProvider, CartContext } from '../components/CartContext';
import { apiUrl } from '../admin/http';


function ProductDetails() {
    
    const [productImages, setProductImages] = useState([])
    const [product, setProduct] = useState([])
    const params = useParams();
    const { addToCart } = useContext(CartContext)


    const fetchProduct = () => {
            fetch(`${apiUrl}/get-product/${params.id}`,{
                method: 'GET',
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                }
            })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.status == 200){
                    setProduct(result.data)
                    setProductImages(result.data.product_images)
                } else {
                    console.log("something went wrong");
                }           
            })
        }

    const handleAddToCart = () => {
        // Prepare product with quantity for adding to cart
        const productToAdd = {
            ...product,
            quantity: 1  // Default quantity of 1 when adding from product details
        };
        
        // Call the addToCart function from CartContext
        addToCart(productToAdd);
        
        // Optional: Show confirmation to user
        alert("Product added to cart successfully!");
    }

    useEffect(() => {
        fetchProduct()
    },[])
    
    return (
        <>
            <Header />
          
            <div className="product_image_area section_padding">
            <Link  to="/shopcategory">
                <button className="btn_3 mb-4 ml-4 py-2 "><i className="fa-solid fa-arrow-left mr-3"></i>Back</button>
            </Link>
                <div className="container">
                    <div className="row s_product_inner justify-content-between">
                        <div className="col-lg-7 col-xl-7">
                            <div className="product_slider_img">
                                <div id="vertical">
                                    <img src={product.image_url} alt={product.title} className="img-fluid" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 col-xl-4">
                            <div className="s_product_text">
                                <h5>previous <span>|</span> next</h5>
                                <h3>{product.title}</h3>
                                <h2>${product.price}</h2>
                                <ul className="list">
                                    <li>
                                        <a className="active" href="#">
                                            <span>Category</span> : {product.category}</a>
                                    </li>
                                    <li>
                                        <a href="#"> <span>Availibility</span> : In Stock</a>
                                    </li>
                                </ul>
                                <p>
                                    {product.short_description}
                                </p>
                                <p>
                                    {product.sku}
                                </p>
                                <div className="card_area d-flex justify-content-between align-items-center">
                                    
                                    <button
                                        className="btn_3"
                                        onClick={handleAddToCart}
                                    >
                                        Add to Cart
                                    </button>
                                    <a href="#" className="like_us"> <i className="ti-heart"></i> </a>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                   {/* <div className='row my-3 ml-3'>
                   {
                        productImages && productImages.map(product_images => {
                            return(
                                
                                    <div className='content'>
                                        <img 
                                            src={product_images.image_url}
                                            className='w-100, h-100'
                                            alt="" 
                                        />
                                    </div>
                            )
                        })
                    }
                   </div> */}
                   
                </div>
            </div>

            
            <section className="product_description_area">
                <div className="container">
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
                                aria-selected="true">Description</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
                                aria-selected="false">Specification</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact"
                                aria-selected="false">Comments</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" id="review-tab" data-toggle="tab" href="#review" role="tab" aria-controls="review"
                                aria-selected="false">Reviews</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                        
                    </div>
                </div>
            </section>
            

            <Footer />
        </>
    )
}

export default ProductDetails