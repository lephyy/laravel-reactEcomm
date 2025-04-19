import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiUrl } from '../admin/http';

function Register() {
    const {
        register,
        handleSubmit,
        watch,
        setError,
        formState: { errors },
    } = useForm();
    
    const navigate = useNavigate();
    const password = watch("password", ""); // Get the password value for comparison

    const onSubmit = async (data) => {
        try {
            console.log('Submitting to:', `${apiUrl}/register`);
            console.log('Data being sent:', JSON.stringify(data));
            
            const res = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json', // Explicitly request JSON response
                },
                body: JSON.stringify(data),
            });
            
            // Check if response is ok before trying to parse as JSON
            if (!res.ok) {
                const errorText = await res.text();
                console.error('Server responded with error:', res.status, errorText);
                toast.error(`Server error: ${res.status}`);
                return;
            }

            // Try to parse the response as JSON
            let result;
            try {
                result = await res.json();
                console.log('Response data:', result);
            } catch (jsonError) {
                console.error('Failed to parse response as JSON:', jsonError);
                toast.error('Invalid response from server');
                return;
            }
    
            if (result.status === 'success') {
                toast.success(result.message);
                navigate('/account/login');
            } else {
                // If the server sent errors, handle them, otherwise show generic error
                const formErrors = result?.errors;
                if (formErrors) {
                    Object.keys(formErrors).forEach((field) => {
                        setError(field, { 
                            type: 'server', 
                            message: Array.isArray(formErrors[field]) ? formErrors[field][0] : formErrors[field] 
                        });
                    });
                } else {
                    toast.error(result.message || 'An unexpected error occurred.');
                }
            }
        } catch (error) {
            console.error('Registration request failed:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            {/*================login_part Area =================*/}
            <section className="login_part padding_top">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="login_part_text text-center">
                                <div className="login_part_text_iner">
                                    <h2>Already have an account?</h2>
                                    <p>There are advances being made in science and technology
                                        everyday, and a good example of this is the</p>
                                    <Link to="/account/login" className="btn_3">Login Now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="login_part_form">
                                <div className="login_part_form_iner">
                                    <h3>Welcome Back ! <br/>
                                        Please Sign up now</h3>
                                    <form className="row contact_form" onSubmit={handleSubmit(onSubmit)} noValidate>
                                        <div className="col-md-12 form-group p_star">
                                            <input 
                                                {...register("name", {
                                                    required: "The Name field is required."
                                                })}
                                                type="text" 
                                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                                placeholder="Name"
                                            />
                                            {errors.name && <p className='invalid-feedback'>{errors.name.message}</p>}
                                        </div>
                                        <div className="col-md-12 form-group p_star">
                                            <input 
                                                {...register("email", {
                                                    required: "The Email field is required.",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    }
                                                })}
                                                type="email" 
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                placeholder="Email"
                                            />
                                            {errors.email && <p className='invalid-feedback'>{errors.email.message}</p>}
                                        </div>
                                        <div className="col-md-12 form-group p_star">
                                            <input 
                                                {...register("password", {
                                                    required: "The password field is required.",
                                                    minLength: {
                                                        value: 8,
                                                        message: "Password must be at least 8 characters long"
                                                    }
                                                })}
                                                type="password" 
                                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                placeholder="Password"
                                            />
                                            {errors.password && <p className='invalid-feedback'>{errors.password.message}</p>}
                                        </div>
                                        <div className="col-md-12 form-group p_star">
                                            <input 
                                                {...register("confirm_password", { // Changed from password_confirmation
                                                    required: "Please confirm your password.",
                                                    validate: value => 
                                                        value === password || "The passwords do not match."
                                                })}
                                                type="password" 
                                                className={`form-control ${errors.confirm_password ? 'is-invalid' : ''}`}
                                                placeholder="Confirm Password"
                                            />
                                            {errors.confirm_password && <p className='invalid-feedback'>{errors.confirm_password.message}</p>}
                                        </div>
                                        <div className="col-md-12 form-group">
                                            <button type="submit" className="btn_3">
                                                Register
                                            </button>
                                            <Link to="/account/login" className="lost_pass">
                                                Already have an account?
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*================login_part end =================*/}
            <Footer/>
        </>
    );
}

export default Register;