import React from 'react'

function ForgotPassword() {

    const sendCodeBtn = () => {
        console.log("Code Sent")
    }
    return (
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="staticBackdropLabel">Account Recovery</h1>
                        <button type="button" class="btn-close visually-hidden shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <label style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} htmlFor="emailChange" class="form-label">Enter your email to change your password</label>
                        <input style={{ fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} type="email" class="form-control shadow-none mb-3" id="emailChange" placeholder="Enter your email" required />
                        <div className="form-group">
                            <button type="button" style={{ marginBottom: "20px", width: "100%", backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn" onClick={sendCodeBtn}>Send Code</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
