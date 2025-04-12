import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Tracking() {
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
                    <h2>Tracking Order</h2>
                    <p>Home <span>-</span> Tracking Order</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* breadcrumb start*/}

        {/*================Tracking Box Area =================*/}
        <section className="tracking_box_area padding_top">
          <div className="container">
            <div className="row align-items-center">
              {/* <div className="col-lg-6">
                    <div className="reacking_box_text text-center h-100">
                      <h2>New to our Shop?</h2>
                      <p>There are advances being made in science and technology
                        everyday, and a good example of this is the</p>
                        <a href="#" className="btn_2">Create an Account</a>
                    </div>
                  </div> */}
              <div className="col-lg-12">
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
        {/*================End Tracking Box Area =================*/}
              <Footer/>
          </>
  )
}

export default Tracking