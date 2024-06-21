import React, { useEffect, useState } from 'react'
import profile from '../Assets/PP.jpg';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { authUser } = useAuth();
    const [image, setImage] = useState("");
    const [userDetails, setuserDetails] = useState({
        emailID: "",
        fullName: "",
        password: "",
        occupation: "",
        monthlyIncome: 0,
        photo: "",
        balance: 0
    })

    useEffect(() => {

        axios.get(`https://localhost:7026/api/UserAuth/${authUser.emailID}`)
            .then((result) => {
                setuserDetails(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
    })
    return (
        <>
            <main id="main" className='main'>
                <div className='pagetitle'>
                    <h1>Profile Settings</h1>
                </div>
                <div className="profilesetting container col-12 mt-4 mx-0 p-4 rounded shadow-sm border">
                    <div className="row">
                        <div className="col-md-4 d-flex flex-column align-items-center">
                            <img src={profile} alt="Profile" className='rounded-circle' style={{ width: "200px" }} />
                            <label htmlFor='fileUpload' className="plus-icon-badge rounded-circle d-flex justify-content-center align-items-center text-white">
                                <i className="bi bi-plus"></i>
                            </label>
                            <input type='file' className='visually-hidden' id="fileUpload" />
                            <div className="profiledetails">
                                <span className="d-block fw-bolder">{userDetails.fullName}</span>
                                <span className="d-block text-muted">{userDetails.emailID}</span>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="p-3 formInput">
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className='col-4'>Full Name:</label>
                                    <input type="text" style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "13px" }} className="form-control shadow-none" placeholder='Enter your full name' autoComplete='off' value={userDetails.fullName} />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className='col-4'>Email-Id:</label>
                                    <input type="text" style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "13px" }} disabled className="form-control shadow-none" placeholder='Enter your email-id' autoComplete='off' value={userDetails.emailID} />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className='col-4'>Occupation:</label>
                                    <input type="text" style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "13px" }} className="form-control shadow-none" placeholder='Enter your occupation' autoComplete='off' value={userDetails.occupation} />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className='col-4'>Monthly Icome:</label>
                                    <input type="text" style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "13px" }} className="form-control shadow-none" placeholder='Enter your monthly income' autoComplete='off' value={userDetails.monthlyIncome} />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className='col-4'>Balance:</label>
                                    <input type="text" style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "13px" }} className="form-control shadow-none" placeholder='Enter your balance' autoComplete='off' value={userDetails.balance} />
                                </div>
                                <div className="form-group mb-3">
                                    <button type="button" style={{ marginBottom: "20px", width: "100%", backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </main >

        </>
    )
}

export default Profile
