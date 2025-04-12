import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Banner() {
  const [products, setProducts] = useState([]); // To store the fetched products

  // Fetching data from the API
  const fetchData = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products/");
      setProducts(data); // Store fetched products in state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <>
      {/* Banner section */}
      <section className="banner_part">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <Slider {...settings}>
                {products.slice(0, 3).map((product) => (
                  <div key={product.id} className="single_banner_slider">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-12">
                        {/* Banner Text Section */}
                        <div className="banner_text">
                          <div className="banner_text_iner">
                            <h2>{product.title}</h2>
                            <p>{product.description}</p>
                            <a href="#" className="btn_2">
                              Buy Now
                            </a>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-6 col-md-6 col-12 banner_img d-flex justify-content-center align-items-center"
                        style={{
                          backgroundColor: "#ECFDFF", // Set a light background for blending
                        }}
                      >
                        {/* Banner Image Section */}
                        <img
                          style={{
                            mixBlendMode: "multiply",
                            width: "100%", // Adjust width if necessary
                            maxWidth: "400px", // Limit max size for responsiveness
                          }}
                          src={product.image}
                          alt={`Banner ${product.id}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
