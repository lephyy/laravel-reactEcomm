import React,{useEffect, useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { apiUrl } from '../admin/http';

const Confirmation = () => {
    const [order,setOrder] = useState([]);
    const [loading,setLoading] = useState(true);
    const params = useParams();
    const [items,setItems] = useState([]);
    const fetchOrder = () =>{
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo?.token; 
      fetch(`${apiUrl}/get-order-details/${params.id}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json',
          'Accept':'application/json',
          'Authorization':`Bearer ${token}`
        }
      }).then((res)=>res.json())
      .then(result =>{
        // setLoading(false);
        if(result.status === 200){
          setOrder(result.data);
          setItems(result.data.items);
          // setLoading(false);
        }else{
        }

      })
    }
    useEffect(()=>{
      fetchOrder();
    })
  return (
    <>
        <Header/>
        {/* breadcrumb start*/}
  <section className="breadcrumb breadcrumb_bg">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="breadcrumb_iner">
            <div className="breadcrumb_iner_item">
              <h2>Order Confirmation</h2>
              <p>Home <span>-</span> Order Confirmation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* breadcrumb start*/}

  {/*================ confirmation part start =================*/}
  <section className="confirmation_part padding_top">
    <div className="container">
      {/* {
        loading == true &&
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      } */}
      <div className="row">
        <div className="col-lg-12 col-lx-4">
          <div className="confirmation_tittle">
            <span>Thank you. Your order has been received.</span>
          </div>
        </div>
        <div className="col-lg-12">
        <div className="single_confirmation_details">
          <h4>Order info</h4>
          <div className="row">
            {/* Left Column */}
            <ul className="col-lg-6">
              <li>
                <p>Order ID</p><span>: #{order.id}</span>
              </li>
              <li>
                <p>Date</p><span>: {order.created_at}</span>
              </li>
              <li>
                <p>Status</p>
                <span>:</span>
                  {
                    order.status == 'pending' && <span className='badge text-warning'>Pending</span>
                  }
                  {
                    order.status == 'shipped' && <span className='badge text-warning'>Shipped</span>
                  }
                  {
                    order.status == 'delivered' && <span className='badge text-success'>Delivered</span>
                  }
                  {
                    order.status == 'cancelled' && <span className='badge text-danger'>Cancelled</span>
                  }
                
              </li>
              <li>
                <p>Payment Method</p><span>: COD</span>
              </li>
            </ul>
            
            {/* Right Column */}
            <ul className="col-lg-6">
              <li>
                <p>Customer</p><span>: {order.name}</span>
              </li>
              <li>
                <p>Address</p><span>: {order.address},{order.city}</span>
              </li>
              {/* <li>
                <p>State/City</p><span>: {order.state},{order.city}</span>
              </li>
              <li>
                <p>Country/Zip</p><span>: {order.country},{order.zip}</span>
              </li> */}
              <li>
                <p>Contact</p><span>: {order.phone}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="order_details_iner">
            <h3>Order Details</h3>
            <table className="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  items.map((item)=>(
                    <tr key={item.id}>
                      {/* <td className="cart_product_img">
                        <img src={item.product.image} alt="#"/>
                      </td> */}
                      <td>
                        <h5>{item.name}</h5>
                      </td>
                      <td>
                        <h5>{item.qty}</h5>
                      </td>
                      <td>
                        <h5>{item.unit_price}</h5>
                      </td>
                      <td>
                        <h5>${item.price}</h5>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Subtotal</td>
                  <td>${order.subtotal}</td>
                </tr>
                <tr>
                  <td colSpan="3">Shipping</td>
                  <td>${order.shipping}</td>
                </tr>
                <tr>
                  <td colSpan="3">Total</td>
                  <td>${order.total}</td>
                </tr>
                </tfoot>
            </table>
          </div>
          <div className='text-center mt-3'>
            <button className='btn btn-primary'>View Order Detail</button>
            <button className='btn btn-outline-secondary ms-2'>Continue Shopping</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*================ confirmation part end =================*/}
        <Footer/>
    </>
  )
}

export default Confirmation