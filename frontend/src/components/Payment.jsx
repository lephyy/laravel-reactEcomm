import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Payment = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { total = 0, cart = [] } = state || {}; // Fallback to prevent errors
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal state
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = "Card holder name is required";
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing - replace with actual Payway API call
    setTimeout(() => {
      setIsProcessing(false);
      handlePaymentSuccess();
    }, 2000);
  };

  const handlePaymentSuccess = () => {
    // Generate a random order ID (this would come from Payway in a real implementation)
    const orderId = "PW-" + Math.random().toString(36).substring(2, 12).toUpperCase();
    
    // Save payment and cart data to history
    const history = JSON.parse(localStorage.getItem("history")) || [];
    const updatedHistory = [...history, { 
      orderId, 
      items: cart, 
      total,
      paymentMethod: "Payway",
      date: new Date().toISOString() 
    }];
    localStorage.setItem("history", JSON.stringify(updatedHistory));

    // Clear cart
    localStorage.removeItem("cart");

    setPaymentCompleted(true);
    setShowModal(true); // Show modal after payment completion
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
    localStorage.removeItem("cart"); // Clear the cart from local storage
    navigate("/", { replace: true }); // Navigate to home page
  };

  return (
    <>
      <Header />
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
              <div className="text-center mb-4">
                <h4 className="text-secondary">
                  Total Amount: <span className="text-dark">${(Number(total) + 10).toFixed(2)}</span>
                </h4>
                <p className="text-muted">(Includes a flat $10 shipping fee)</p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="cardNumber" className="form-label">Card Number</label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    maxLength="19"
                  />
                  {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                </div>
                
                <div className="mb-3">
                  <label htmlFor="cardHolder" className="form-label">Card Holder Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.cardHolder ? 'is-invalid' : ''}`}
                    id="cardHolder"
                    name="cardHolder"
                    placeholder="John Doe"
                    value={formData.cardHolder}
                    onChange={handleChange}
                  />
                  {errors.cardHolder && <div className="invalid-feedback">{errors.cardHolder}</div>}
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                    <input
                      type="text"
                      className={`form-control ${errors.expiryDate ? 'is-invalid' : ''}`}
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      maxLength="5"
                    />
                    {errors.expiryDate && <div className="invalid-feedback">{errors.expiryDate}</div>}
                  </div>
                  
                  <div className="col-md-6 mb-3">
                    <label htmlFor="cvv" className="form-label">CVV</label>
                    <input
                      type="text"
                      className={`form-control ${errors.cvv ? 'is-invalid' : ''}`}
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      maxLength="4"
                    />
                    {errors.cvv && <div className="invalid-feedback">{errors.cvv}</div>}
                  </div>
                </div>
                
                <div className="d-grid gap-2 mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg" 
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      'Pay Now'
                    )}
                  </button>
                </div>
              </form>
            </div>
            {paymentCompleted && (
              <div className="card-footer bg-success text-white text-center">
                <h5>Payment Successful!</h5>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Popup for Thank You Message */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
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