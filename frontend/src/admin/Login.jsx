import React from 'react'
import { useForm } from 'react-hook-form'
import { apiUrl } from './http'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
// import Layout from '../common/Layout'

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate();

  const onSubmit = async(data) => {
    console.log(data)

    const res = await fetch(`${apiUrl}/login`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
    .then(result =>{
      console.log(result)
      if(result.status === 'success'){
        const userInfo = {
          token: result.authorization.token,
          id: result.user.id,
          name: result.user.name,
          role: result.user.role,
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        if (userInfo.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }else{
        toast.error(result.message);
      }
    })
  }
  return (
    <section className="login_part padding_top">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-lg-6 col-md-6">
                <div className="login_part_text text-center">
                    <div className="login_part_text_iner">
                        <h2>New to our Shop?</h2>
                        <p>There are advances being made in science and technology
                            everyday, and a good example of this is the</p>
                        <a href="#" className="btn_3">Create an Account</a>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-6">
                <div className="login_part_form loginFormpart">
                    <div className="login_part_form_iner">
                        <h3>Welcome Back ! <br/>
                            Please Sign in now</h3>
                        <form className="row contact_form" onSubmit={handleSubmit(onSubmit)} noValidate>
                            <div className="col-md-12 form-group p_star">
                                <input {
                                  ...register("email", {
                                    required: "The Email Field is required.",
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "Invalid email address",
                                    },
                                  })
                                }
                                  type="email" className={`form-control ${errors.email && 'is-invalid'}`}
                                    placeholder="Email"/>
                                {
                                  errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                }
                            </div>
                            <div className="col-md-12 form-group p_star">
                                <input {
                                  ...register("password", {
                                    required: "The password Field is required."
                                  })
                                }
                                type="password" className={`form-control ${errors.password && 'is-invalid'}`}
                                    placeholder="Password"/>
                                {
                                  errors.password && <p className='invalid-feedback'>{errors.password?.message}</p>
                                }
                            </div>
                            <div className="col-md-12 form-group">
                                <div className="creat_account d-flex align-items-center">
                                    <input type="checkbox" id="f-option" name="selector"/>
                                    <label for="f-option">Remember me</label>
                                </div>
                                <button type="submit" value="submit" className="btn_3">
                                    log in
                                </button>
                                <a className="lost_pass" href="#">forget password?</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
  )
}

export default Login