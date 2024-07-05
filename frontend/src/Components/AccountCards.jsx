import React from 'react'

const AccountCards = () => {
    return (
        <>
            <div className="card me-3" style={{ width: "16rem" }}>
                <div className="card-body text-center">
                    <div className='card-logo-i'>
                        <i className="bi bi-bank"></i>
                    </div>
                    <h5 className="card-title">Bank Name</h5>
                    <h6 className="card-subtitle mb-2 text-muted">123456789</h6>
                    <h6 className="card-subtitle mb-2 text-muted">KARB0002</h6>
                    <h5 className="card-subtitle mb-2 text-muted">Balance: ₹ 10,000</h5>
                </div>
                <div style={{ padding: "0 10px 10px 15px" }} className="d-flex justify-content-end">
                    <i className="bi bi-pencil-square me-2" style={{ cursor: "pointer" }}></i>
                </div>
            </div>
        </>
    )
}

export default AccountCards
