import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Featured from '../components/Featured'
import {apiUrl} from '../admin/http'

function Home() {

    const [products, setProducts] = useState([]);

    const latestProducts = async () => {
        await fetch(apiUrl+'/get-latest-products',{
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
        latestProducts();
    },[])

  return (
    <>
        <Header/>
        <Banner />
        <Featured />
        {/* feature_part start*/}
        
        {/* upcoming_event part start*/}

        {/* product_list start*/}
        <section className="product_list section_padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="section_tittle text-center">
                            <h2>Latest <span>shop</span></h2>
                        </div>
                    </div>
                </div>
            
                    <div className="row align-items-center latest_product_inner">
                                    {
                                        products && products.map(product => {
                                            return (
                                                <div className="col-lg-3 col-sm-6"key={`product-${product.id}`} >
                                                    <div className="single_product_item">
                                                        <img src={product.image_url} alt="" className='w-400'/>
                                                        <div className="single_product_text">
                                                            <h4>{product.title}</h4>
                                                            <h3>${product.price}</h3>
                                                            <a href="#" className="add_cart">+ add to cart<i className="ti-heart"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                    </div>
               
            </div>
        </section>
        
        {/* product_list part start*/}

        {/* awesome_shop start*/}
        <section className="our_offer section_padding">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-6 col-md-6">
                        <div className="offer_img">
                            <img src="assets/img/offer_img.png" alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="offer_text">
                            <h2>Weekly Sale on
                                60% Off All Products</h2>
                            <div className="date_countdown">
                                <div id="timer">
                                    <div id="days" className="date"></div>
                                    <div id="hours" className="date"></div>
                                    <div id="minutes" className="date"></div>
                                    <div id="seconds" className="date"></div>
                                </div>
                            </div>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="enter email address"
                                    aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <a href="#" className="input-group-text btn_2" id="basic-addon2">book now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* awesome_shop part start*/}

        {/* product_list part start*/}
        <section className="product_list best_seller section_padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="section_tittle text-center">
                            <h2>Best Sellers <span>shop</span></h2>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-12">
                        <div className="best_product_slider owl-carousel">
                            <div className="single_product_item">
                                <img src="assets/img/product/product_1.png" alt=""/>
                                <div className="single_product_text">
                                    <h4>Quartz Belt Watch</h4>
                                    <h3>$150.00</h3>
                                </div>
                            </div>
                            <div className="single_product_item">
                                <img src="assets/img/product/product_2.png" alt=""/>
                                <div className="single_product_text">
                                    <h4>Quartz Belt Watch</h4>
                                    <h3>$150.00</h3>
                                </div>
                            </div>
                            <div className="single_product_item">
                                <img src="assets/img/product/product_3.png" alt=""/>
                                <div className="single_product_text">
                                    <h4>Quartz Belt Watch</h4>
                                    <h3>$150.00</h3>
                                </div>
                            </div>
                            <div className="single_product_item">
                                <img src="assets/img/product/product_4.png" alt=""/>
                                <div className="single_product_text">
                                    <h4>Quartz Belt Watch</h4>
                                    <h3>$150.00</h3>
                                </div>
                            </div>
                            <div className="single_product_item">
                                <img src="assets/img/product/product_5.png" alt=""/>
                                <div className="single_product_text">
                                    <h4>Quartz Belt Watch</h4>
                                    <h3>$150.00</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/* product_list part end*/}

        {/* subscribe_area part start*/}
        <section className="subscribe_area section_padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="subscribe_area_text text-center">
                            <h5>Join Our Newsletter</h5>
                            <h2>Subscribe to get Updated
                                with new offers</h2>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="enter email address"
                                    aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                <div className="input-group-append">
                                    <a href="#" className="input-group-text btn_2" id="basic-addon2">subscribe now</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*::subscribe_area part end::*/}

        {/* subscribe_area part start*/}
        <section className="client_logo padding_top">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12">
                        <div className="single_client_logo">
                            <img src="assets/img/client_logo/client_logo_1.png" alt=""/>
                        </div>
                        <div className="single_client_logo">
                            <img src="assets/img/client_logo/client_logo_2.png" alt=""/>
                        </div>
                        <div className="single_client_logo">
                            <img src="assets/img/client_logo/client_logo_3.png" alt=""/>
                        </div>
                        <div className="single_client_logo">
                            <img src="assets/img/client_logo/client_logo_4.png" alt=""/>
                        </div>
                        <div className="single_client_logo">
                            <img src="assets/img/client_logo/client_logo_5.png" alt=""/>
                        </div>
                        <div className="single_client_logo">
                            <img src="assets/img/client_logo/client_logo_3.png" alt=""/>
                        </div>
                        <div className="single_client_logo">
                            <img src="assets/img/client_logo/client_logo_1.png" alt=""/>
                        </div>
                        <div className="single_client_logo">
                            <img src="assets/img/client_logo/client_logo_2.png" alt=""/>
                        </div>
                        <div className="single_client_logo">
                            <img src="assets/img/client_logo/client_logo_3.png" alt=""/>
                        </div>
                        <div className="single_client_logo">
                            <img src="assets/img/client_logo/client_logo_4.png" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        {/*::subscribe_area part end::*/}

        <Footer/>
    </>
  )
}

export default Home