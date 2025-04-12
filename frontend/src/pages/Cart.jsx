import { useContext } from "react";
import { CartContext } from "../components/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "55vh" }}>
        <h1 className="fs-1">Cart is empty!</h1>
      </div>
    );
  }

  console.log("Cart Before Checkout:", cart);

  return (
    <>
      <Header />
      {/*================Cart Area =================*/}
      <section className="cart_area padding_top">
        <div className="container">
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="media">
                          <div className="d-flex">
                            <img src={item.image} alt={item.title} style={{ width: "100px" }} />
                          </div>
                          <div className="media-body">
                            <p>{item.title}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <h5>${item.price.toFixed(2)}</h5>
                      </td>
                      <td>
                        <div className="product_count d-flex align-items-center">
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            disabled={item.quantity <= 1}   
                          >
                            -
                          </button>
                          <span className="mx-3">{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <h5>${(item.price * item.quantity).toFixed(2)}</h5>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeFromCart(item.id)} // Call removeFromCart with the item ID
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
                <tfoot>
                  <tr>
                    <td></td>
                    <td></td>
                    <td>
                      <h5>Subtotal</h5>
                    </td>
                    <td>
                      <h5>${subtotal.toFixed(2)}</h5>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div className="checkout_btn_inner float-right">
                <Link className="btn_1" to="/shopcategory">
                  Continue Shopping
                </Link>
                <button
                  className="btn_1 checkout_btn_1"
                  onClick={() => navigate("/checkout", { state: { subtotal, cart } })}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*================End Cart Area =================*/}
      <Footer />
    </>
  );
};

export default Cart;
