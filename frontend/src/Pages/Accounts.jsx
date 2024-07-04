import React from 'react'
import AccountCards from '../Components/AccountCards'

const Accounts = () => {
    return (
        <>
            <main id="main" className='main'>
                <div className='pagetitle'>
                    <h1>My Accounts</h1>
                </div>
                <div className='d-flex flex-wrap justify-content-start mt-3'>
                    <AccountCards />
                    <AccountCards />
                    <AccountCards />
                    <AccountCards />
                </div>
            </main>
        </>
    )
}

export default Accounts
