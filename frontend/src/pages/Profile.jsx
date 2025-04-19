import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import UserSidebar from '../components/UserSidebar'


function Profile() {
  return (
    <>
        <Header/>
        
        <section className="tracking_box_area padding_top">
          <div className="container">
            <div className="row">
            <div className="col-lg-4">
            <UserSidebar/>
                {/* <div className="tracking_box_inner">
                  <form className="row tracking_form" action="#" method="post" novalidate="novalidate">
                    <div className="col-md-12 form-group">
                      <input type="text" className="form-control" id="order" name="order" placeholder="Order ID"/>
                    </div>
                    <div className="col-md-12 form-group">
                      <input type="email" className="form-control" id="email" name="email" placeholder="Billing Email Address"/>
                    </div>
                    <div className="col-md-12 form-group">
                      <button type="submit" value="submit" className="btn_3">Track Order</button>
                    </div>
                  </form>
                </div> */}
              </div>
              <div className="col-lg-8 mt-2" >
                <div className="tracking_box_inner">
                  <p>To track your order please enter your Order ID in the box below and press the "Track" button. This was
                    given
                    to you on your receipt and in the confirmation email you should have received.</p>
                  <form className="row tracking_form" action="#" method="post" novalidate="novalidate">
                    <div className="col-md-12 form-group">
                      <input type="text" className="form-control" id="order" name="order" placeholder="Order ID"/>
                    </div>
                    <div className="col-md-12 form-group">
                      <input type="email" className="form-control" id="email" name="email" placeholder="Billing Email Address"/>
                    </div>
                    <div className="col-md-12 form-group">
                      <button type="submit" value="submit" className="btn_3">Track Order</button>
                    </div>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </section>

        <Footer/>
    </>
  )
}

export default Profile