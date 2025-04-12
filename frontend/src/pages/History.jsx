import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Fetch history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: "120px" }}>
        <h2 className="text-center mb-4">Order History</h2>
        {history.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Order ID</th>
                  <th scope="col">Items</th>
                  <th scope="col">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {history.map((order, index) => (
                  <tr key={index}>
                    <td>{order.orderId}</td>
                    <td>
                      <ul>
                        {order.items.map((item, i) => (
                          <li key={i} className="d-flex align-items-center mb-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              style={{ width: "50px", height: "50px", marginRight: "10px", objectFit: "cover" }}
                            />
                            {item.name} (x{item.quantity})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>${order.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-muted">
            <p>You have no order history yet.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default History;
