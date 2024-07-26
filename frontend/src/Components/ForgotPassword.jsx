import React, { useEffect, useState } from 'react'

function ForgotPassword() {
    const [showOtp, setShowOtp] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [otp, setOtp] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [isOtpSent, setIsOtpSent] = useState(false);

    const sendCodeBtn = () => {
        // Your code to send OTP goes here
        setShowOtp(true);
        setSeconds(60);
        setIsOtpSent(true);
        setShowPasswordFields(false);

    };

    const verifyOtpBtn = () => {
        if (otp === '123456') {
            setIsOtpVerified(true);
            setShowPasswordFields(true);
            console.log("Valid OTP")
        } else {
            console.log("Invalid OTP")
        }
    };

    const handleChangePassword = () => {
        window.location.href="/"
    }

    useEffect(() => {
        let timer;
        if (showOtp && seconds > 0) {
            timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [showOtp, seconds]);

    return (
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Account Recovery</h1>
                        <button type="button" class="btn-close visually-hidden shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {
                            !showPasswordFields && (
                                <>
                                    <label style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px", marginLeft: "2px" }} htmlFor="emailChange" class="form-label">Enter your email to change your password</label>
                                    <input style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} type="email" class="form-control shadow-none mb-3" id="emailChange" placeholder="Enter your email" required />
                                    <div className="form-group">
                                        <button type="button" style={{ marginBottom: "20px", width: "100%", backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn" onClick={sendCodeBtn}>{isOtpSent && seconds === 0 ? 'Resend Code' : 'Send Code'}</button>
                                    </div>
                                    {showOtp && (
                                        <div className="form-group">
                                            <div className='d-flex justify-content-between'>
                                                <label style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px", marginLeft: "2px" }} htmlFor="otpInput" className="form-label">Enter OTP</label>
                                                <div style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }}>Time remaining: {seconds} seconds</div>
                                            </div>
                                            <input style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} type="number" className="form-control shadow-none mb-3" id="otpInput" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                                            <button type="button" style={{ width: "100%", backgroundColor: '#28a745', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn" onClick={verifyOtpBtn} disabled={seconds === 0 || isOtpVerified}>Verify OTP</button>
                                        </div>
                                    )}
                                </>
                            )
                        }

                        {showPasswordFields && (
                            <div className="form-group">
                                <label style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px", marginLeft: "2px" }} htmlFor="newPassword" className="form-label">New Password</label>
                                <input style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} type="password" className="form-control shadow-none mb-3" id="newPassword" placeholder="Enter new password" required />
                                <label style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px", marginLeft: "2px" }} htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} type="password" className="form-control shadow-none mb-3" id="confirmPassword" placeholder="Confirm new password" required />
                                <button type="button" style={{ width: "100%", backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn" onClick={handleChangePassword} >Change password</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
