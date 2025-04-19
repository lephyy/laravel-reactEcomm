import React, { useState, useEffect } from "react";
import { apiUrl } from "../admin/http";

function Banner() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchBannerProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/get-banner-products`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json',
        }
      });
      
      const result = await response.json();
      
      if (result && result.data && Array.isArray(result.data)) {
        setProducts(result.data);
        console.log("Banner products loaded:", result.data);
      } else {
        console.error("Invalid data format received:", result);
        setError("Invalid data format received from API");
      }
    } catch (err) {
      console.error("Error fetching banner products:", err);
      setError("Failed to load banner products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBannerProducts();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (products.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.min(products.length, 3));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [products]);

  // Handle manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.min(products.length, 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? Math.min(products.length, 3) - 1 : prevSlide - 1));
  };

  if (loading) return <div className="text-center py-5">Loading banner products...</div>;
  if (error) return <div className="text-center py-5 text-danger">{error}</div>;
  if (products.length === 0) return <div className="text-center py-5">No banner products available</div>;

  const displayProducts = products.slice(0, 3);

  return (
    <section className="banner_part">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="position-relative">
              {/* Main slider content */}
              {displayProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="single_banner_slider"
                  style={{
                    display: index === currentSlide ? 'block' : 'none'
                  }}
                >
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <div className="banner_text">
                        <div className="banner_text_iner">
                          <h2 style={{ paddingBottom: "100px" }} >{product.title}</h2>
                          
                          <a href="#" className="btn_2"  >Best Selliing</a>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-lg-6 col-md-6 col-12 banner_img d-flex justify-content-center align-items-center"
                      style={{ backgroundColor: "#ECFDFF", padding: "20px", height: "400px", }} >
                      {product.image_url && (
                        <img
                          style={{
                            mixBlendMode: "multiply",
                            width: "100%",
                            maxWidth: "400px",
                            objectFit: "contain",
                            maxHeight: "350px",
                            marginTop: "220px"
                          }}
                          src={product.image_url}
                          alt={`Banner ${product.id}`}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation arrows */}
              <button 
                onClick={prevSlide}
                className="carousel-control-prev" 
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.3)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  zIndex: 2
                }}
              >
                &lt;
              </button>
              <button 
                onClick={nextSlide}
                className="carousel-control-next" 
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.3)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  cursor: 'pointer',
                  zIndex: 2
                }}
              >
                &gt;
              </button>

              {/* Indicator dots */}
              <div 
                className="carousel-indicators" 
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '35%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '8px',
                  zIndex: 2
                }}
              >
                {displayProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: index === currentSlide ? '#000' : '#ccc',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;