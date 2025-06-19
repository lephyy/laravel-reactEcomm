import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { apiUrl } from "../admin/http";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // Extract customer data from the passed state
  const { total = 0, carts = [], customer = {} } = state || {};
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleApprove = async (orderId) => {
    const shipping = 10;
    const subTotal = total - shipping; // Adjust since total already includes shipping
    const grand_total = total;

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const token = userInfo?.token;

    if (!token) {
      alert("You must be logged in to complete this order.");
      navigate("/login");
      return;
    }

    // Use the customer data from the checkout form instead of localStorage
    const customerInfo = {
      name: customer.name || userInfo?.name || '',
      email: customer.email || userInfo?.email || '',
      phone: customer.phone || userInfo?.phone || '',
      address: customer.address || userInfo?.address || '',
      city: customer.city || userInfo?.city || 'Unknown'
    };

    // Validate required fields
    if (!customerInfo.email) {
      alert("Email is required to complete the order. Please go back and fill in your email.");
      navigate(-1); // Go back to checkout
      return;
    }

    if (!customerInfo.name) {
      alert("Name is required to complete the order. Please go back and fill in your name.");
      navigate(-1);
      return;
    }

    const newOrder = {
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      address: customerInfo.address,
      city: customerInfo.city,
      total: grand_total,
      subtotal: subTotal,
      shipping: shipping,
      discount: 0,
      pay_status: "paid",
      status: "pending",
      cart: carts.map(item => ({
        product_id: item.id,
        title: item.title,
        qty: item.quantity,
        price: item.price
      }))
    };

    console.log("Sending order data:", newOrder);
    console.log("Customer email:", customerInfo.email);

    try {
      const response = await fetch(`${apiUrl}/save-order`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newOrder),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Success response:", responseData);
        setPaymentCompleted(true);
        setShowModal(true);
        localStorage.removeItem("cart");
      } else {
        const errorData = await response.text();
        console.error("Failed to save order. Status:", response.status);
        console.error("Error response:", errorData);
        
        alert(`Payment succeeded, but failed to save order. Status: ${response.status}. Please contact support.`);
      }
    } catch (error) {
      console.error("Network error submitting order:", error);
      alert(`Something went wrong while submitting your order: ${error.message}`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    localStorage.removeItem("cart");
    navigate("/"); // Navigate to home or orders page
  };

  // Show error if no customer data is provided
  if (!customer || Object.keys(customer).length === 0) {
    return (
      <>
        <Header />
        <div className="container mt-5 pt-5">
          <div className="alert alert-danger text-center">
            <h4>Error: Missing Customer Information</h4>
            <p>Please go back to checkout and fill in your details.</p>
            <button className="btn btn-primary" onClick={() => navigate("/checkout")}>
              Back to Checkout
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <PayPalScriptProvider
        options={{
          "client-id":
            "Acp1Csrm2lgkPdhF9WNKKglMd-1KnxG1jY2chJ2AFgSHIse6RWW3SxRTExk4zIx6R10a1YfT31HnWXo0",
        }}
      >
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: "60vh", paddingTop: "100px" }}
        >
          <div className="container">
            <div className="card shadow-lg border-0 rounded-lg mx-auto" style={{ maxWidth: "600px" }}>
              <div className="card-header text-center bg-primary text-white">
                <h2 className="mb-0">Complete Your Payment</h2>
              </div>
              <div className="card-body">
                {/* Show customer info for confirmation */}
                <div className="mb-4">
                  <h5>Order Details:</h5>
                  <p><strong>Name:</strong> {customer.name}</p>
                  <p><strong>Email:</strong> {customer.email}</p>
                  <p><strong>Address:</strong> {customer.address}</p>
                  <p><strong>City:</strong> {customer.city}</p>
                </div>
                
                <div className="text-center mb-4">
                  <h4 className="text-secondary">
                    Total Amount: <span className="text-dark">${total.toFixed(2)}</span>
                  </h4>
                  <p className="text-muted">(Includes a flat $10 shipping fee)</p>
                </div>
                <div className="d-flex justify-content-center">
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: total.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        handleApprove(details.id);
                      });
                    }}
                    onError={(err) => {
                      console.error("Payment Error:", err);
                      alert("An error occurred during the payment process.");
                    }}
                  />
                </div>
              </div>
              {paymentCompleted && (
                <div className="card-footer bg-success text-white text-center">
                  <h5>Payment Successful!</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      </PayPalScriptProvider>

      {/* Modal Popup for Thank You Message */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block" }}
          aria-labelledby="thankYouModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="thankYouModalLabel">
                  Thank You for Your Purchase!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                <p>Your order has been successfully placed. Thank you for shopping with us!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={closeModal}>
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Payment;