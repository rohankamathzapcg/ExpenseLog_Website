import React, { useEffect, useState } from 'react'
import profile from '../Assets/PP.jpg';
import { useAuth } from '../Context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
    const { authUser, setAuthUser } = useAuth();
    const [image, setImage] = useState("");
    const [balance,setBalance]=useState(0);
    const [userDetails, setuserDetails] = useState({
        emailID: "",
        fullName: "",
        password: "",
        occupation: "",
        monthlyIncome: 0,
        photo: "",
        balance: balance
    })

    useEffect(() => {

        axios.get(`https://localhost:7026/api/UserAuth/${authUser.emailID}`)
            .then((result) => {
                setuserDetails(result.data)
            })
            .catch((error) => {
                console.log(error)
            })
        
            axios.get(`https://localhost:7026/api/Account/balance/${authUser.emailID}`)
            .then((result)=>{
                if (result.status === 200) {
                    setBalance(result.data);
                } else if (result.status === 202) {
                    setBalance(0)
                }
            })

    }, [authUser.emailID])

    const handleEditBtn = () => {
        axios.put(`https://localhost:7026/api/UserAuth/${authUser.emailID}`, userDetails)
            .then((result) => {
                if (result.status === 204) {
                    toast.success("Profile Updated Successfully", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                    setAuthUser(userDetails)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <ToastContainer />
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
                                    <input type="text" style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "13px" }} className="form-control shadow-none" placeholder='Enter your full name' autoComplete='off' value={userDetails.fullName} onChange={(e) => setuserDetails({ ...userDetails, fullName: e.target.value })} />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className='col-4'>Email-Id:</label>
                                    <input type="text" style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "13px" }} disabled className="form-control shadow-none" placeholder='Enter your email-id' autoComplete='off' value={userDetails.emailID} onChange={(e) => setuserDetails({ ...userDetails, emailID: e.target.value })} />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className='col-4'>Occupation:</label>
                                    <input type="text" style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "13px" }} className="form-control shadow-none" placeholder='Enter your occupation' autoComplete='off' value={userDetails.occupation} onChange={(e) => setuserDetails({ ...userDetails, occupation: e.target.value })} />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className='col-4'>Monthly Icome:</label>
                                    <input type="text" style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "13px" }} className="form-control shadow-none" placeholder='Enter your monthly income' autoComplete='off' value={userDetails.monthlyIncome} onChange={(e) => setuserDetails({ ...userDetails, monthlyIncome: e.target.value })} />
                                </div>
                                <div className="form-group d-flex align-items-center mb-3">
                                    <label className='col-4'>Balance:</label>
                                    <input type="text" style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "13px" }} disabled className="form-control shadow-none" placeholder='Enter your balance' autoComplete='off' value={balance} />
                                </div>
                                <div className="form-group mb-3">
                                    <button type="button" style={{ marginBottom: "20px", width: "100%", backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn" onClick={handleEditBtn}>Update</button>
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
