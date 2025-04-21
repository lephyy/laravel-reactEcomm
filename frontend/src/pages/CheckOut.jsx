import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { apiUrl } from "../admin/http";
import { toast } from "react-toastify";

function CheckOut() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  // Calculate total amount
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const proceedToPayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/payment", { state: { total, carts: cart } });
  };

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();

  const processOrder = (data) => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    console.log("Order data:", { ...data, paymentMethod });
    
    // Navigate to the appropriate payment page based on payment method
    if(paymentMethod === 'cod'){
      saveOrder(data,'not paid')
    }
  };
  const saveOrder = (formData, paymentStatus) => {
    const shipping = 10;
    const subTotal = total;
    const grand_total = total + shipping;
    
    // Parse the user info object from localStorage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const token = userInfo?.token; // Extract the token
    
    if (!token) {
      alert("You need to be logged in to complete this order.");
      navigate('/login');
      return;
    }
    
    const newFormData = {
      ...formData,
      total: grand_total,
      subtotal: subTotal,
      shipping: shipping,
      discount: 0,
      pay_status: paymentStatus,
      status: 'pending',
      cart: cart.map(item => ({
        product_id: item.id,
        title: item.title,
        qty: item.quantity,
        price: item.price
      }))
    }
    
    fetch(`${apiUrl}/save-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`, // Use the extracted token here
      },
      body: JSON.stringify(newFormData),
    })
    .then(res => {
      if (res.status === 401) {
        alert("Your session has expired. Please login again.");
        navigate('/login');
        return null;
      }
      return res.json();
    })
    .then(result => {
      if (!result) return;
      
      if(result.status == 200){
        localStorage.removeItem('cart');  
        navigate(`/order/confirmation/${result.id}`)
      } else {
        alert(result.message);
      }
    })
    .catch(error => {
      console.error("Error details:", error);
      alert("Error processing your order. Please try again.");
    });
  }
  return (
    <>
      <Header />
      <section className="breadcrumb breadcrumb_bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="breadcrumb_iner">
                <div className="breadcrumb_iner_item">
                  <h2>Product Checkout</h2>
                  <p>Home <span>-</span> Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="checkout_area padding_top">
        <div className="container">
          <div className="billing_details">
            <form onSubmit={handleSubmit(processOrder)} className="row contact_form">
              <div className="row">
                <div className="col-lg-8">
                  <h3>Billing Details</h3>
                    <div className="col-md-6 form-group p_star">
                      <input
                        {
                          ...register("name", { required: "Full name is required" })
                        }
                        type="text" className={`form-control ${errors.name && 'is-invalid'}`} placeholder="Full Name"/>
                      {
                        errors.name && <p className="invalid-feedback">{errors.name?.message}</p>
                      }
                    </div>
                    <div className="col-md-6 form-group p_star">
                      <input 
                      {
                        ...register("phone", 
                          { required: "Phone Number is required" })
                      }
                      type="text" className={`form-control ${errors.phone && 'is-invalid'}`} placeholder="Phone Number"/>
                      {
                        errors.phone && <p className="invalid-feedback">{errors.phone?.message}</p>
                      }
                    </div>
                    <div className="col-md-12 form-group p_star">
                      <input
                      {
                        ...register("email", 
                          { required: "the email field is required.",
                          pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                          }
                      })
                      }
                      type="text" className={`form-control ${errors.email && 'is-invalid'}`} placeholder="Email"/>
                      {
                        errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                      }
                    </div>
                    <div className="col-md-12 form-group p_star">
                      <textarea
                      {
                        ...register("address", { 
                          required: "The address field is required" })
                      }
                      type="text" placeholder="Address" className={`form-control ${errors.email && 'is-invalid'}`} rows={3}></textarea> 
                      {
                        errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>
                      }
                    </div>
                    {/* <div className="col-md-12 form-group p_star">
                      <input
                      {
                        ...register("country", { 
                          required: "The country field is required" })
                      }
                      type="text" className={`form-control ${errors.country && 'is-invalid'}`} placeholder="Country"/>
                      {
                        errors.country && <p className='invalid-feedback'>{errors.country?.message}</p>
                      }
                    </div> */}
                    <div className="col-md-12 form-group p_star">
                      <input
                      {
                        ...register("city", { 
                          required: "The city field is required" })
                      }
                      type="text" className={`form-control ${errors.city && 'is-invalid'}`} placeholder="City"/>
                      {
                        errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>
                      }
                    </div>
                    {/* <div className="col-md-12 form-group p_star">
                      <input
                      {
                        ...register("state", { 
                          required: "The state field is required" })
                      }
                      type="text" className={`form-control ${errors.state && 'is-invalid'}`} placeholder="State"/>
                      {
                        errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                      }
                    </div> */}
                    {/* <div className="col-md-12 form-group p_star">
                      <input
                      {
                        ...register("zip", { 
                          required: "The zip field is required" })
                      }
                      type="text" className={`form-control ${errors.zip && 'is-invalid'}`} placeholder="Zip Code"/>
                      {
                        errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>
                      }
                    </div> */}
                    
                  {/* Billing form content here */}
                </div>
                <div className="col-lg-4">
                  <div className="order_box">
                      <h2>Your Order</h2>
                      <ul className="list">
                        {cart.map((item) => (
                          <li key={item.id}>
                            <p>
                              {item.title} <span>x {item.quantity}</span>{" "}
                              <span className="last">${(item.price * item.quantity).toFixed(2)}</span>
                            </p>
                          </li>
                        ))}
                      </ul>
                      <ul className="list list_2">
                        <li>
                          <p>Subtotal <span>${total.toFixed(2)}</span></p>
                        </li>
                        <li>
                          <p>Shipping <span>Flat rate: $10.00</span></p>
                        </li>
                        <li>
                          <p>Total <span>${(total + 10).toFixed(2)}</span></p>
                        </li>
                      </ul>
                      {/* <Link to={`/payment`} className="btn_3">
                        Proceed to Paypal
                      </Link>
                      <Link to={`/cashondelivery`} className="btn_3">
                        Cash on Delivery
                      </Link> */}
                  </div>
                  <div className="payment_item mt-4">
                      <h4>Payment Method</h4>
                      
                      <div className="payment_options mt-3">
                        {/* Paypal Option */}
                        <div className="payment_option" style={{ 
                          border: '1px solid #ddd', 
                          borderRadius: '5px', 
                          padding: '10px', 
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center' 
                        }}>
                          <input
                            type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="paypal"
                            checked={paymentMethod === 'paypal'}
                            onChange={() => setPaymentMethod('paypal')}
                            style={{ 
                              width: '20px', 
                              height: '20px', 
                              marginRight: '15px',
                              accentColor: '#ff3368' // Custom color for the radio button
                            }}
                          />
                          <label htmlFor="paypal" style={{ margin: 0, fontWeight: paymentMethod === 'paypal' ? 'bold' : 'normal' }}>
                            Paypal
                          </label>
                        </div>
                        
                        {/* Cash on Delivery Option */}
                        <div className="payment_option" style={{ 
                          border: '1px solid #ddd', 
                          borderRadius: '5px', 
                          padding: '10px',
                          marginBottom: '15px',
                          display: 'flex',
                          alignItems: 'center' 
                        }}>
                          <input
                            type="radio"
                            id="cod"
                            name="paymentMethod"
                            value="cod"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            style={{ 
                              width: '20px', 
                              height: '20px', 
                              marginRight: '15px',
                              accentColor: '#ff3368' // Custom color for the radio button
                            }}
                          />
                          <label htmlFor="cod" style={{ margin: 0, fontWeight: paymentMethod === 'cod' ? 'bold' : 'normal' }}>
                            Cash on Delivery
                          </label>
                        </div>
                      </div>
                      
                      <button type="submit" className="btn_3 w-100 mt-2">Pay Now</button>
                    </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CheckOut;
