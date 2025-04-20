// OrderSuccess.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

const OrderSuccess = () => {
  const location = useLocation();
  const { orderMessage, orderDetails } = location.state || { 
    orderMessage: 'Your order was placed successfully!',
    orderDetails: null 
  };

  return (
    <>
      <Header />
      <div className="container py-5 text-center">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-5">
              <h1 className="text-success">
                <i className="fa fa-check-circle"></i> Order Placed!
              </h1>
              <p className="lead">{orderMessage}</p>
              
              {orderDetails && (
                <div className="order-summary mt-4">
                  <h4>Order Summary</h4>
                  <p>Total Amount: ${orderDetails.total.toFixed(2)}</p>
                  <p>Payment Method: {orderDetails.pay_status === 'completed' ? 'PayPal (Paid)' : 'Cash On Delivery'}</p>
                </div>
              )}
              
              <div className="mt-4">
                <Link to="/shopcategory" className="btn btn-primary">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderSuccess;