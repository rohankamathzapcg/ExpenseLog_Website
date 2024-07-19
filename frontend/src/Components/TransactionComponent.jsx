
import React, { useEffect } from 'react'
import { fetchUsers } from '../api/users';
import { useAuth } from '../Context/AuthContext';

const TransactionComponent = (props) => {
    const { authUser } = useAuth();
    useEffect(() => {
        fetchUsers(authUser.emailID)
    })

    return (
        <>
            <div className="table-responsive mt-5">
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">Transaction ID</th>
                            <th scope="col">Transaction Date</th>
                            <th scope="col">Account Number</th>
                            <th scope="col">Amount (₹)</th>
                            <th scope="col">Remarks</th>
                            <th scope="col">Transaction Type</th>
                            <th scope="col">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.users.map((transactions, index) => (
                                <tr key={index}>
                                    <th scope="row">T100{transactions.transactionId}</th>
                                    <td>{transactions.formattedDate}</td>
                                    <td>{transactions.accountNo}</td>
                                    <td>{transactions.amount}</td>
                                    <td>{transactions.remarks}</td>
                                    <td>{transactions.type}</td>
                                    <td>{transactions.newBalance}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TransactionComponent
