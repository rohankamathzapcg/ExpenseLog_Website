import React from 'react'
import AccountCards from '../Components/AccountCards'
import AddAccount from '../Components/AddAccount'

const Accounts = () => {
    return (
        <>
            <main id="main" className='main'>
                <div className='pagetitle'>
                    <h1>My Accounts</h1>
                </div>
                <div style={{ marginLeft: "-2rem" }} className='d-flex flex-wrap justify-content-evenly mt-3'>
                    <AccountCards />
                    <AccountCards />
                    <div data-bs-toggle="modal" data-bs-target="#exampleModal" className="card me-3" style={{ width: "16rem", border: "2px dotted #012970", cursor: "pointer" }}>
                        <div className="card-body d-flex justify-content-center align-items-center" style={{ height: "10rem" }}>
                            <i className="bi bi-plus-lg" style={{ fontSize: "3rem", color: "#012970" }}></i>
                        </div>
                    </div>
                </div>
                <AddAccount />
            </main>
        </>
    )
}

export default Accounts
