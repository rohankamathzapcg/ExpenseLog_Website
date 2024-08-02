
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';

function EditAccount(props) {

    const [accountDetails, setAccountDetails] = useState({
        bankName: '',
        accountNo: '',
        branchName: '',
        balance: ''
    });

    const [errors, setErrors] = useState({})

    const closeButtonRef = useRef(null);

    const autoCloseClick = () => {
        closeButtonRef.current.click();
    }

    const validateBankName = () => {
        const bankNameError = {};
        if (accountDetails.bankName.trim() === "") {
            bankNameError.bankErrMsg = "* Bank name field is required";
            setErrors(bankNameError)
            return false;
        }
        setErrors({});
        return true;
    };

    const validateBranchName = () => {
        const branchNameError = {};
        if (accountDetails.branchName.trim() === "") {
            branchNameError.branchErrMsg = "* Branch name field is required";
            setErrors(branchNameError)
            return false;
        }
        setErrors({});
        return true;
    };

    const HandleCloseAccount = () => {
        autoCloseClick();
        setErrors({});
    }

    const validateAccNo = () => {
        const accoNoError = {};
        const accountNoRegex = /^\d{11,16}$/;

        if (accountDetails.accountNo.trim() === "") {
            accoNoError.accnoErrMsg = "* Account number field is required";
            setErrors(accoNoError);
            return false;
        } else if (!accountNoRegex.test(accountDetails.accountNo)) {
            accoNoError.accnoErrMsg = "* Account number must be between 11 to 16 digits";
            setErrors(accoNoError);
            return false;
        }
        setErrors({});
        return true;
    };

    useEffect(() => {
        if (props.accountData) {
            setAccountDetails({
                bankName: props.accountData.bankName,
                accountNo: props.accountData.accountNo,
                branchName: props.accountData.branchName,
                balance: props.accountData.balance
            });
        }
    }, [props.accountData]);

    const handleUpdateAccount = () => {
        if (!validateBankName() || !validateAccNo() || !validateBranchName()) {
            return;
        }

        const userAccountUpdate = {
            accountNo: accountDetails.accountNo,
            bankName: accountDetails.bankName,
            branchName: accountDetails.branchName,
            balance: accountDetails.balance,
            emailID: props.userEmail
        }
        axios.put("http://localhost:7026/api/Account/UpdateAccount", userAccountUpdate)
            .then((result) => {
                if (result.status === 200) {
                    toast.success("Account updated successfully", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                    autoCloseClick();
                } else {
                    toast.success("Some Error Occurred", {
                        theme: "dark",
                        autoClose: 1000,
                    });
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className="modal fade" id="editAccounts" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Account Information</h1>
                            <button ref={closeButtonRef} type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close" onClick={HandleCloseAccount}></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group">
                                <span className="input-group-text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }}><i className="bi bi-bank2"></i></span>
                                <input type="text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }} className="form-control shadow-none" placeholder="Enter bank name" value={accountDetails.bankName} onChange={(e) => setAccountDetails({ ...accountDetails, bankName: e.target.value })} />
                            </div>
                            {errors.bankErrMsg && <div className="validations" style={{ color: 'red' }}>{errors.bankErrMsg}</div>}

                            <div className="input-group mt-2">
                                <span className="input-group-text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }}><i className="bi bi-person-vcard"></i></span>
                                <input type="text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }} className="form-control shadow-none" placeholder="Enter account number" value={accountDetails.accountNo} onChange={(e) => setAccountDetails({ ...accountDetails, accountNo: e.target.value })} />
                            </div>
                            {errors.accnoErrMsg && <div className="validations" style={{ color: 'red' }}>{errors.accnoErrMsg}</div>}

                            <div className="input-group mt-2">
                                <span className="input-group-text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }}><i className="bi bi-safe2"></i></span>
                                <input type="text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }} className="form-control shadow-none" placeholder="Enter branch name" value={accountDetails.branchName} onChange={(e) => setAccountDetails({ ...accountDetails, branchName: e.target.value })} />
                            </div>
                            {errors.branchErrMsg && <div className="validations" style={{ color: 'red' }}>{errors.branchErrMsg}</div>}

                            <div className="input-group mt-2">
                                <span className="input-group-text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }}><i className="bi bi-cash-coin"></i></span>
                                <input disabled type="text" style={{ fontSize: "13px", fontFamily: '"Merriweather", sans-serif' }} className="form-control shadow-none" placeholder="Enter balance amount" value={accountDetails.balance} onChange={(e) => setAccountDetails({ ...accountDetails, balance: e.target.value })} />
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <button type="button" style={{ backgroundColor: '#012970', color: 'white', fontFamily: '"Merriweather", sans-serif', fontSize: "12px" }} className="btn" onClick={handleUpdateAccount} >Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditAccount
