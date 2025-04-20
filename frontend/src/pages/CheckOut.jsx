import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useContext } from "react";
import { CartContext } from "../components/CartContext";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const {} = useContext(CartContext);


  // Calculate total amount
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const proceedToPayment = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    navigate("/payment", { state: { total, carts: cart } });
  };




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
          {/* <div class="returning_customer">
            <div class="check_title">
              <h2>
                Returning Customer?
                <a href="#">Click here to login</a>
              </h2>
            </div>
            <p>
              If you have shopped with us before, please enter your details in the
              boxes below. If you are a new customer, please proceed to the
              Billing & Shipping section.
            </p>
            <form class="row contact_form" action="#" method="post" novalidate="novalidate">
              <div class="col-md-6 form-group p_star">
                <input type="text" class="form-control" id="name" name="name" value=" " />
                <span class="placeholder" data-placeholder="Username or Email"></span>
              </div>
              <div class="col-md-6 form-group p_star">
                <input type="password" class="form-control" id="password" name="password" value="" />
                <span class="placeholder" data-placeholder="Password"></span>
              </div>
              <div class="col-md-12 form-group">
                <button type="submit" value="submit" class="btn_3">
                  log in
                </button>
                <div class="creat_account">
                  <input type="checkbox" id="f-option" name="selector" />
                  <label for="f-option">Remember me</label>
                </div>
                <a class="lost_pass" href="#">Lost your password?</a>
              </div>
            </form>
          </div>
          <div class="cupon_area">
            <div class="check_title">
              <h2>
                Have a coupon?
                <a href="#">Click here to enter your code</a>
              </h2>
            </div>
            <input type="text" placeholder="Enter coupon code" />
            <a class="tp_btn" href="#">Apply Coupon</a>
          </div> */}
          <div className="billing_details">
            <div className="row">
              <div className="col-lg-8">
                <h3>Billing Details</h3>
                <form class="row contact_form" action="#" method="post" novalidate="novalidate">
                  <div class="col-md-6 form-group p_star">
                    <input type="text" class="form-control" id="first" name="name" />
                    <span class="placeholder" data-placeholder="Full name"></span>
                  </div>
                  {/* <div class="col-md-6 form-group p_star">
                    <input type="text" class="form-control" id="last" name="name" />
                    <span class="placeholder" data-placeholder="Last name"></span>
                  </div> */}
                  {/* <div class="col-md-12 form-group">
                    <input type="text" class="form-control" id="company" name="company" placeholder="Company name" />
                  </div> */}
                  <div class="col-md-6 form-group p_star">
                    <input type="text" class="form-control" id="number" name="number" />
                    <span class="placeholder" data-placeholder="Phone number"></span>
                  </div>
                  <div class="col-md-12 form-group p_star">
                    <input type="text" class="form-control" id="email" name="compemailany" />
                    <span class="placeholder" data-placeholder="Email Address"></span>
                  </div>
                  {/* <div class="col-md-12 form-group p_star">
                    <select class="country_select">
                      <option value="1">Country</option>
                      <option value="2">Country</option>
                      <option value="4">Country</option>
                    </select>
                  </div> */}
                  {/* <div class="col-md-12 form-group p_star">
                    <input type="text" class="form-control" id="add1" name="add1" />
                    <span class="placeholder" data-placeholder="Address line 01"></span>
                  </div> */}
                  <div class="col-md-12 form-group p_star">
                    <input type="text" class="form-control" id="add2" name="add2" />
                    <span class="placeholder" data-placeholder="Address line"></span>
                  </div>
                  <div class="col-md-12 form-group p_star">
                    <input type="text" class="form-control" id="city" name="city" />
                    <span class="placeholder" data-placeholder="Town/City"></span>
                  </div>
                  {/* <div class="col-md-12 form-group p_star">
                    <select class="country_select">
                      <option value="1">District</option>
                      <option value="2">District</option>
                      <option value="4">District</option>
                    </select>
                  </div> */}
                  {/* <div class="col-md-12 form-group">
                    <input type="text" class="form-control" id="zip" name="zip" placeholder="Postcode/ZIP" />
                  </div> */}
                  <div class="col-md-12 form-group">
                    <div class="creat_account">
                      <input type="checkbox" id="f-option2" name="selector" />
                      <label for="f-option2">Create an account?</label>
                    </div>
                  </div>
                  <div class="col-md-12 form-group">
                    <div class="creat_account">
                      <h3>Shipping Details</h3>
                      <input type="checkbox" id="f-option3" name="selector" />
                      <label for="f-option3">Ship to a different address?</label>
                    </div>
                    <textarea class="form-control" name="message" id="message" rows="1"
                      placeholder="Order Notes"></textarea>
                  </div>
                </form>
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
                  <button className="btn_3" onClick={proceedToPayment}>
                    Proceed to Paypal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default CheckOut;
