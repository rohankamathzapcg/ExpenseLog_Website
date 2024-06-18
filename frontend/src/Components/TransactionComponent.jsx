import React from 'react'

const TransactionComponent = (props) => {

    return (
        <>
            <div class="table-responsive mt-5">
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Email-Id</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Mobile Number</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.users.map((user, index) => (
                                <tr key={index}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.first_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.mobile_no}</td>
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
