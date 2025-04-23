import React, { useEffect, useState } from 'react'
import Nav from '../include/Nav'
import Navsidebar from '../include/Navsidebar'
import Footer from '../include/Footer'
import { Link, useParams } from 'react-router-dom'
import { adminToken, apiUrl } from '../http'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'


const OrderDetail = () => {
    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
    const params = useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const fetchOrder = async () => {
              const res = await fetch(`${apiUrl}/orders/${params.id}`,{
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
                      setOrder(result.data);
                      setItems(result.data.items);
                      reset({
                        status : result.data.status,
                        pay_status : result.data.pay_status,
                      })
                  }else{
                      console.log("Something went wrong");
                  }
                  
              })
          }
    
    const updateOrder = async (data) => {
        const res = await fetch(`${apiUrl}/update-order/${params.id}`,{
            method: 'POST',
            headers: {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer  ${adminToken()}`
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if (result.status == 200) {
                setOrder(result.data);
                reset({
                  status : result.data.status,
                  pay_status : result.data.pay_status,
                });
                toast.success(result.message);
            }else{
                console.log("Something went wrong");
            }
            
        })
    }

          useEffect(() => {
            fetchOrder();
            updateOrder();
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
                                    <h3>Detail</h3>
                                    <Link to="/admin/orders" className="btn btn-primary">Back</Link>
                                </div>
                                <div className='row'>
                                    <div className='col-md-9'>
                                        <div className='card shadow'>
                                            <div className='card-body p-4'>
                                                {
                                                    
                                                }
                                                <div className='row'>
                                                    <div className='col-md-4'>
                                                        <h5>Order ID: #{order.id}</h5>
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
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className=''>Date</div>
                                                        <h5 className='pt-2'>{order.created_at}</h5>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div>Payment Status</div>
                                                        <h5 className='pt-2'>
                                                            {
                                                              order.pay_status == 'paid' ?
                                                              <span className='badge bg-success'>Paid</span> :
                                                              <span className='badge bg-danger'>Not Paid</span>
                                                            }
                                                        </h5>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-4'>
                                                        <div className='py-3'>
                                                            <strong>{order.name}</strong>
                                                            <div>{order.email}</div>
                                                            <div>{order.phone}</div>
                                                            <div>{order.address}, {order.city}</div>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-4'>
                                                        <div className='py-3'>Payment status</div>
                                                        <p>COD</p>
                                                    </div>
                                                </div>
                                                <div class="">
                                                <h5 class="pb-2 "><strong>Items</strong></h5>
                                                {
                                                    items.map((item) => {
                                                        return(
                                                            <div key={`${item.id}`} class="row justify-content-end">
                                                                <div class="col-lg-12">
                                                                    <div class="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                                        <div class="d-flex">
                                                                            {
                                                                                item.product.image && <img width="70" class="me-3" src={`${item.product.image_url}`} alt=""/>
                                                                            }
                                                                        
                                                                            <div class="d-flex flex-column">
                                                                                <div class="mb-2"><span>{item.name}</span></div>
                                                                               
                                                                            </div>
                                                                        </div>
                                                                        <div class="d-flex">
                                                                        <div className='px-3'>X {item.qty}</div>
                                                                        <div class="ps-3">${item.price}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                                
                                                <div class="row justify-content-end">
                                                    <div class="col-lg-12">
                                                        <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div>Subtotal</div>
                                                            <div>${order.subtotal}</div>
                                                        </div>
                                                        <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div>Shipping</div>
                                                            <div>${order.shipping}</div>
                                                        </div>
                                                        <div class="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                                            <div><strong>Grand Total</strong></div>
                                                            <div>${order.total}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className='col-md-3'>
                                        <div className='card shadow'>
                                            <div className='card-body p-4'>
                                                <form action="" onSubmit={handleSubmit(updateOrder)}>
                                                    <div className='mb-3'>
                                                        <label className='form-label' htmlFor="status">Status</label>
                                                        <select 
                                                        {
                                                            ...register('status',{required: true})
                                                        }
                                                        id='status' 
                                                        className='form-select'>
                                                            <option value="pending">Pending</option>
                                                            <option value="shipped">Shipped</option>
                                                            <option value="delivered">Delivered</option>
                                                            <option value="cancelled">Cancelled</option>
                                                        </select>
                                                    </div>
                                                    <div className='mb-3'>
                                                        <label htmlFor="pay_status" className='form-label'>Payment Status</label>
                                                        <select
                                                        {
                                                            ...register('pay_status',{required: true})
                                                        }
                                                        id='pay_status' className='form-select'>
                                                            <option value="paid">Paid</option>
                                                            <option value="not paid">Not Paid</option>
                                                        </select>
                                                    </div>
                                                    <button type='submit' className='btn btn-primary'>Update</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <Footer/>    
                    </div>
                </div>
            </div>v
    </>
  )
}

export default OrderDetail