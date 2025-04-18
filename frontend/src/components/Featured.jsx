import React, { useEffect, useState } from 'react'
import {apiUrl} from '../admin/http'
import { Link } from 'react-router-dom';

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
                            <h3>Accessories</h3>
                            <Link  to="/shopcategory">
                                <a href="#" className="feature_btn">EXPLORE NOW<i className="fas fa-play"></i></a>
                            </Link>
                            <img src="assets/img/cate-1.png" alt="" className=' h-100'/>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-6">
                        <div className="single_feature_post_text">
                            {/* <p>Premium Quality</p> */}
                            <h3>Blind Boxes</h3>
                            <Link  to="/shopcategory">
                                <a href="#" className="feature_btn">EXPLORE NOW<i className="fas fa-play"></i></a>
                            </Link>
                            <img src="assets/img/cate-2.png" alt="" className='w-50 h-80'/>
                        </div>
                    </div>
                    <div className="col-lg-5 col-sm-6">
                        <div className="single_feature_post_text">
                            {/* <p>Premium Quality</p> */}
                            <h3>Figurine</h3>
                            <Link  to="/shopcategory">
                                <a href="#" className="feature_btn">EXPLORE NOW<i className="fas fa-play"></i></a>
                            </Link>
                            <img src="assets/img/cate-3.png" className=' w-50' alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-7 col-sm-6">
                        <div className="single_feature_post_text">
                            {/* <p>Premium Quality</p> */}
                            <h3>Best Selling</h3>
                            <Link  to="/shopcategory">
                                <a href="#" className="feature_btn">EXPLORE NOW<i className="fas fa-play"></i></a>
                            </Link>
                            <img src="assets/img/cate-4.png" className=' h-100' alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Featured