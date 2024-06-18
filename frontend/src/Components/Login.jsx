import React, { useState } from 'react'
import bcrypt from 'bcryptjs'
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        cpassword: "",
        occupation: ""
    });
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData({ ...userData, [id]: value });
    };

    const validateEmail = (email) => {
        const newEmailErrors = {};
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newEmailErrors.email = 'Email Field is required';
        } else if (email && !emailPattern.test(email)) {
            newEmailErrors.email = 'Invalid format';
        }
        setErrors(newEmailErrors)
        return !newEmailErrors.email;
    }

    const validatePassword = (password) => {
        const newPasswordErrors = {};
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

        if (!password) {
            newPasswordErrors.password = 'Password Field is required';
        } else if (password && !passwordPattern.test(password) && loginData.password) {
            newPasswordErrors.password = 'Password must contain alphanumeric characters, at least one special character, and be more than 8 characters long';
        }
        setErrors(newPasswordErrors)
        return !newPasswordErrors.password;
    }

    const validateOccupation = (occupation) => {
        const newOccupationErrors = {}
        if (!occupation) {
            newOccupationErrors.occupation = 'Occupation Field is required';
        }
        setErrors(newOccupationErrors)
        return !newOccupationErrors.occupation;
    }

    const handleLoginBtn = () => {
        if (validateEmail(loginData.email) && validatePassword(loginData.password)) {
            const hashedPassword = bcrypt.hashSync(loginData.password, 10)
            const loginUser = {
                email: loginData.email,
                password: hashedPassword
            }
            axios.post("http://localhost:5041/api/User", loginUser)
                .then((result) => {
                    //Login API
                })
                .catch((error) => {
                    console.log(error)
                    toast.error("An error occurred during Login", {
                        theme: "dark",
                        autoClose: 3000,
                    });
                })
        }
    }

    const handleRegisterBtn = () => {
        const newCpasswordErrors = {}
        if (validateEmail(userData.email) && validatePassword(userData.password) && validateOccupation(userData.occupation)) {
            if (!userData.cpassword) {
                newCpasswordErrors.cpassword = "Confirm password Field is required"
            } else if (userData.cpassword !== userData.password) {
                newCpasswordErrors.cpassword = "Password and Confirm password does not match"
            } else {
                const hashedPassword = bcrypt.hashSync(userData.password, 10)
                const userRegisterData = {
                    emailID: userData.email,
                    password: hashedPassword,
                    occupation: userData.occupation
                }
                axios.post("http://localhost:5041/api/User", userRegisterData)
                    .then((result) => {
                        if (result.status === 201) {
                            toast.success("Registered Successfully", {
                                theme: "dark",
                                autoClose: 1000,
                            });
                            setUserData({
                                email: "",
                                password: "",
                                occupation: "",
                                cpassword: ""
                            })
                        } else if (result.status === 200) {
                            console.log(userRegisterData.password)
                            toast.error(result.data, {
                                theme: "dark",
                                autoClose: 1000,
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        toast.error("An error occurred during registration", {
                            theme: "dark",
                            autoClose: 3000,
                        });
                    })
            }
            setErrors(newCpasswordErrors)
        }
    }

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5041/api/auth/google-login'
        ;
    }
    return (
        <>
            <div className="modal fade square-modal" id="loginSignupModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="loginSignupModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body signin_modal" style={{ padding: 0 }}>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link active" id="signin-tab" data-bs-toggle="tab" href="#login" role="tab" aria-controls="home" aria-selected="true" style={{ borderTopLeftRadius: "7px" }}>Sign In</a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a className="nav-link" id="signup-tab" data-bs-toggle="tab" href="#register" role="tab" aria-controls="profile" aria-selected="false" style={{ borderTopRightRadius: "7px" }}>Sign Up</a>
                                </li>
                            </ul>
                            <div className="social_login">
                                <p>with your social network</p>
                                <ul className="social_log">
                                    <li onClick={handleGoogleLogin}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48" className="mb-1 me-2">
                                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    </svg></li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="27" height="27" className="mb-1 me-3">
                                            <path fill="#F25022" d="M0 0h231.77v231.77H0z" />
                                            <path fill="#7FBA00" d="M280.23 0H512v231.77H280.23z" />
                                            <path fill="#00A4EF" d="M0 280.23h231.77V512H0z" />
                                            <path fill="#FFB900" d="M280.23 280.23H512V512H280.23z" />
                                        </svg>
                                    </li>
                                    <li><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50" className="mb-1 me-3">
                                        <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
                                    </svg></li>
                                </ul>
                            </div>
                            <p className="loginOR mt-3">OR</p>
                            <div className="tab-content signin_tab">
                                <div className="tab-pane active" id="login" role="tabpanel" aria-labelledby="signin-tab">
                                    <div className="form-group mb-3">
                                        <input type="text" className={`form-control shadow-none ${errors.email ? 'error' : ''}`} id="userLoginEmail" placeholder='Enter your email-id' autoComplete='off' value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                                        {errors.email === "Email Field is required" ? "" : <div className="validations">{errors.email}</div>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="password" className={`form-control shadow-none ${errors.password ? 'error' : ''}`} id="userLoginPassword" placeholder='Enter your password' autoComplete='off' value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                                        {errors.password === "Password Field is required" ? "" : <div className="validations">{errors.password}</div>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="button" style={{ marginBottom: "20px", width: "100%", backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn" onClick={handleLoginBtn}>Login</button>
                                    </div>
                                </div>
                                <div className="tab-pane" id="register" role="tabpanel" aria-labelledby="signup-tab">
                                    <div className="form-group mb-3">
                                        <input type="text" className={`form-control shadow-none ${errors.email ? 'error' : ''}`} id="email" placeholder='Enter your email-id' autoComplete='off' value={userData.email} onChange={(e) => { handleInputChange(e); validateEmail(e.target.value); }} />
                                        {errors.email === "Email Field is required" ? "" : <div className="validations">{errors.email}</div>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="password" className={`form-control shadow-none ${errors.password ? 'error' : ''}`} id="password" placeholder='Enter your password' autoComplete='off' value={userData.password} onChange={(e) => { handleInputChange(e); validatePassword(e.target.value); }} />
                                        {errors.password === "Password Field is required" ? "" : <div className="validations">{errors.password}</div>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="password" className={`form-control shadow-none ${errors.cpassword ? 'error' : ''}`} id="cpassword" placeholder='Enter confirm password' autoComplete='off' value={userData.cpassword} onChange={(e) => { handleInputChange(e) }} />
                                        {errors.cpassword === "Confirm password Field is required" ? "" : <div className="validations">{errors.cpassword}</div>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="text" className={`form-control shadow-none ${errors.occupation ? 'error' : ''}`} id="occupation" placeholder='Enter your occupation' autoComplete='off' value={userData.occupation} onChange={(e) => { handleInputChange(e); validateOccupation(e.target.value); }} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="button" style={{ marginBottom: "20px", width: "100%", backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn" onClick={handleRegisterBtn}>Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login
