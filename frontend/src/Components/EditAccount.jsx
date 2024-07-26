import axios from 'axios'
import React, { useEffect, useState } from 'react'

function EditAccount(props) {
    const [accountDetails,setAccountDetails]=useState({})

    useEffect(()=>{
        axios.get(`http://localhost:7026/api/Account/Account?accountNo=${props.accountNumber}&EmailId=${props.userEmail}`)
        .then((result)=>{
            console.log("hello",result)
        })
        .catch((err)=>console.log(err))
    },[props.accountNumber,props.userEmail])
    return (
        <>
            <div class="modal fade" id="editAccounts" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {props.userEmail}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Understood</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAccount
