import React, { useEffect, useState } from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'
import { adminToken, apiUrl } from '../http'
import { Link } from 'react-router-dom'

const ShowOrders = () => {

  const [orders, setOrders] = useState([]);
  
  const fetchOrders = async () => {
          const res = await fetch(`${apiUrl}/orders`,{
              method: 'GET',
              headers: {
                  'Content-type' : 'application/json',
                  'Accept' : 'application/json',
                  'Authorization' : `Bearer  ${adminToken()}`
              }
          })
          .then(res => res.json())
          .then(result => {
            console.log(result);
              if (result.status == 200) {
                  setOrders(result.data);
              }else{
                  console.log("Something went wrong");
              }
              
          })
      }

      useEffect(() => {
        fetchOrders();
      },[])

  return (
        <>
        <div class="container-scroller">
                <Nav/>
                <div class="container-fluid page-body-wrapper">
                    <Navsidebar/>
                    <div class="main-panel">
                        <div class="container-fluid page-body-wrapper">
                        <div class="container mt-5">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h1>Orders</h1>
                        </div>
                        {
                          orders && orders.length > 0 &&
                          <table class="table table-striped table-bordered table-hover">
                                <thead class="table-dark">
                                    <tr>
                                      <th scope="col" width="50">#</th>
                                      <th scope="col">Customer</th>
                                      <th scope="col">Email</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Date</th>
                                      <th scope="col">Payment</th>
                                      <th scope="col" width="150">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders.map((order) => {
                                            return (
                                                    <tr>
                                                          <td scope="col">
                                                                 <Link to={`/admin/orders/${order.id}`}>{order.id}</Link> 
                                                          </td>
                                                          <th scope="col">{order.name}</th>
                                                          <th scope="col">{order.email}</th>
                                                          <th scope="col">${order.total}</th>
                                                          <th scope="col">{order.created_at}</th>
                                                          <th scope="col">
                                                            {
                                                              order.pay_status == 'paid' ?
                                                              <span className='badge bg-success'>Paid</span> :
                                                              <span className='badge bg-danger'>Not Paid</span>
                                                            }
                                                          </th>
                                                          <td scope="col" > 
                                                                {
                                                                  order.status == 'pending' && <span className='badge bg-warning'>Pending</span>
                                                                }
                                                                {
                                                                  order.status == 'shipped' && <span className='badge bg-warning'>Shipped</span>
                                                                }
                                                                {
                                                                  order.status == 'delivered' && <span className='badge bg-success'>Delivered</span>
                                                                }
                                                                {
                                                                  order.status == 'cancelled' && <span className='badge bg-danger'>Cancelled</span>
                                                                }  
                                                          </td>
                                                    </tr>
                                            )
                                        })
                                    }
                                    
                                </tbody>
                        </table>
                        }
                        
                        </div>  
                        </div>    
                    <Footer/>  

                    </div>
                </div>
            </div>
        </>
  )
}

export default ShowOrders
