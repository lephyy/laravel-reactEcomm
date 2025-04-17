import React, { useEffect, useState } from 'react'
import {apiUrl} from '../admin/http'

function Featured() {

    const [products, setProducts] = useState([]);
    
        const featuredProducts = async () => {
            await fetch(apiUrl+'/get-featured-products',{
                method: 'GET' ,
                headers: {
                    'Content-type' : 'application/json',
                    'Accept' : 'application/json',
                }
            })
            .then(res => res.json())
            .then(result => {
                setProducts(result.data)
                console.log(result)
            });
        }
    
        useEffect(() => {
            featuredProducts();
        },[])

  return (
    <>
    <section className="feature_part padding_top">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="section_tittle text-center">
                            <h2>Featured Category</h2>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-7 col-sm-6">
                        <div className="single_feature_post_text">
                            
                            {/* <p>Premium Quality</p> */}
                            <h3>Latest foam Sofa</h3>
                            <a href="#" className="feature_btn">Add to cart<i className="fas fa-play"></i></a>
                            <img src="assets/img/feature/feature_1.png" alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-6">
                        <div className="single_feature_post_text">
                            {/* <p>Premium Quality</p> */}
                            <h3>Latest foam Sofa</h3>
                            <a href="#" className="feature_btn">Add to cart <i className="fas fa-play"></i></a>
                            <img src="assets/img/feature/feature_2.png" alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-6">
                        <div className="single_feature_post_text">
                            {/* <p>Premium Quality</p> */}
                            <h3>Latest foam Sofa</h3>
                            <a href="#" className="feature_btn">Add to cart <i className="fas fa-play"></i></a>
                            <img src="assets/img/feature/feature_3.png" alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-6">
                        <div className="single_feature_post_text">
                            {/* <p>Premium Quality</p> */}
                            <h3>Latest foam Sofa</h3>
                            <a href="#" className="feature_btn">Add to cart <i className="fas fa-play"></i></a>
                            <img src="assets/img/feature/feature_4.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Featured