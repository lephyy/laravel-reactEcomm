import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axios from 'axios';
import { Link } from 'react-router-dom';
function ShopCategory() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data function (already implemented by you)
    async function fetchData() {
        try {
            const { data } = await axios.get("https://fakestoreapi.com/products/");
            setProducts(data);
            setIsLoading(false); // Stop the loading spinner
        } catch (error) {
            console.error("Error fetching products:", error);
            setIsLoading(false);
        }
    }

    // Fetch products on component mount
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            <Header />
            {/*================Home Banner Area =================*/}
            {/* breadcrumb start*/}
            <section className="breadcrumb breadcrumb_bg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="breadcrumb_iner">
                                <div className="breadcrumb_iner_item">
                                    <h2>Shop Category</h2>
                                    <p>Home <span>-</span> Shop Category</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* breadcrumb start*/}
            {/* <FetchProduct/> */}

            {/*================Category Product Area =================*/}
            <section className="cat_product_area section_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="left_sidebar_area">
                                <aside className="left_widgets p_filter_widgets">
                                    <div className="l_w_title">
                                        <h3>Browse Categories</h3>
                                    </div>
                                    <div className="widgets_inner">
                                        <ul className="list">
                                            <li>
                                                <a href="#">Frozen Fish</a>
                                                <span>(250)</span>
                                            </li>
                                            <li>
                                                <a href="#">Dried Fish</a>
                                                <span>(250)</span>
                                            </li>
                                            <li>
                                                <a href="#">Fresh Fish</a>
                                                <span>(250)</span>
                                            </li>
                                            <li>
                                                <a href="#">Meat Alternatives</a>
                                                <span>(250)</span>
                                            </li>
                                            <li>
                                                <a href="#">Fresh Fish</a>
                                                <span>(250)</span>
                                            </li>
                                            <li>
                                                <a href="#">Meat Alternatives</a>
                                                <span>(250)</span>
                                            </li>
                                            <li>
                                                <a href="#">Meat</a>
                                                <span>(250)</span>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>

                                <aside className="left_widgets p_filter_widgets">
                                    <div className="l_w_title">
                                        <h3>Product filters</h3>
                                    </div>
                                    <div className="widgets_inner">
                                        <ul className="list">
                                            <li>
                                                <a href="#">Apple</a>
                                            </li>
                                            <li>
                                                <a href="#">Asus</a>
                                            </li>
                                            <li className="active">
                                                <a href="#">Gionee</a>
                                            </li>
                                            <li>
                                                <a href="#">Micromax</a>
                                            </li>
                                            <li>
                                                <a href="#">Samsung</a>
                                            </li>
                                        </ul>
                                        <ul className="list">
                                            <li>
                                                <a href="#">Apple</a>
                                            </li>
                                            <li>
                                                <a href="#">Asus</a>
                                            </li>
                                            <li className="active">
                                                <a href="#">Gionee</a>
                                            </li>
                                            <li>
                                                <a href="#">Micromax</a>
                                            </li>
                                            <li>
                                                <a href="#">Samsung</a>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>

                                <aside className="left_widgets p_filter_widgets">
                                    <div className="l_w_title">
                                        <h3>Color Filter</h3>
                                    </div>
                                    <div className="widgets_inner">
                                        <ul className="list">
                                            <li>
                                                <a href="#">Black</a>
                                            </li>
                                            <li>
                                                <a href="#">Black Leather</a>
                                            </li>
                                            <li className="active">
                                                <a href="#">Black with red</a>
                                            </li>
                                            <li>
                                                <a href="#">Gold</a>
                                            </li>
                                            <li>
                                                <a href="#">Spacegrey</a>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>

                                <aside className="left_widgets p_filter_widgets price_rangs_aside">
                                    <div className="l_w_title">
                                        <h3>Price Filter</h3>
                                    </div>
                                    <div className="widgets_inner">
                                        <div className="range_item">
                                            {/* <div id="slider-range"></div> */}
                                            <input type="text" className="js-range-slider" value="" />
                                            <div className="d-flex">
                                                <div className="price_text">
                                                    <p>Price :</p>
                                                </div>
                                                <div className="price_value d-flex justify-content-center">
                                                    <input type="text" className="js-input-from" id="amount" readOnly />
                                                    <span>to</span>
                                                    <input type="text" className="js-input-to" id="amount" readOnly />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="product_top_bar d-flex justify-content-between align-items-center">
                                        <div className="single_product_menu">
                                            <p>
                                                <span>{products.length} </span> Products Found
                                            </p>
                                        </div>
                                        <div className="single_product_menu d-flex">
                                            <h5>sort by :</h5>
                                            <select>
                                                <option data-display="Select">name</option>
                                                <option value="1">price</option>
                                                <option value="2">product</option>
                                            </select>
                                        </div>
                                        <div className="single_product_menu d-flex">
                                            <h5>show :</h5>
                                            <div className="top_pageniation">
                                                <ul>
                                                    <li>1</li>
                                                    <li>2</li>
                                                    <li>3</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="single_product_menu d-flex">
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="search"
                                                    aria-describedby="inputGroupPrepend"
                                                />
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="inputGroupPrepend">
                                                        <i className="ti-search"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center latest_product_inner">
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    products.map((product) => (
                                        <div key={product.id} className="col-lg-4 col-sm-6">
                                            <Link to={`/singleproduct/${product.id}`}>
                                                <div className="single_product_item">
                                                    <img src={product.image} alt={product.name} />
                                                    <div className="single_product_text">
                                                        <h4>{product.title}</h4>
                                                        <h3>${product.price}</h3>
                                                        <a href="#" className="add_cart">
                                                            + add to cart<i className="ti-heart"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="col-lg-12">
                                <div className="pageination">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Previous">
                                                    <i className="ti-angle-double-left"></i>
                                                </a>
                                            </li>
                                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#">4</a></li>
                                            <li className="page-item"><a className="page-link" href="#">5</a></li>
                                            <li className="page-item">
                                                <a className="page-link" href="#" aria-label="Next">
                                                    <i className="ti-angle-double-right"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            {/*================End Category Product Area =================*/}
            {/* product_list part start*/}
            <section className="product_list best_seller">
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
                                    <img src="assets/img/product/product_1.png" alt="" />
                                    <div className="single_product_text">
                                        <h4>Quartz Belt Watch</h4>
                                        <h3>$150.00</h3>
                                    </div>
                                </div>
                                <div className="single_product_item">
                                    <img src="img/product/product_2.png" alt="" />
                                    <div className="single_product_text">
                                        <h4>Quartz Belt Watch</h4>
                                        <h3>$150.00</h3>
                                    </div>
                                </div>
                                <div className="single_product_item">
                                    <img src="img/product/product_3.png" alt="" />
                                    <div className="single_product_text">
                                        <h4>Quartz Belt Watch</h4>
                                        <h3>$150.00</h3>
                                    </div>
                                </div>
                                <div className="single_product_item">
                                    <img src="img/product/product_4.png" alt="" />
                                    <div className="single_product_text">
                                        <h4>Quartz Belt Watch</h4>
                                        <h3>$150.00</h3>
                                    </div>
                                </div>
                                <div className="single_product_item">
                                    <img src="img/product/product_5.png" alt="" />
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
            <Footer />
        </>
    )
}

export default ShopCategory
