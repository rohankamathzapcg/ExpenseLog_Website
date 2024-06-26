import React from 'react';
import LineChartReport from '../Components/Charts/LineChartReport';
import BudgetChart from '../Components/Charts/BudgetChart';
import OverallChart from '../Components/Charts/OverallChart';
import { ToastContainer } from 'react-toastify';

const Main = () => {
    
    return (
        <>
            <ToastContainer />
            <main id="main" className='main'>
                <div className='pagetitle'>
                    <h1>Dashboard</h1>
                </div>
                <section className='dashboard section'>
                    <div className='row'>
                        {/* Left Side Starts */}
                        <div className="col-lg-8">
                            <div className="row">
                                {/* Overall Card Amounts Starts */}
                                <div className='col-xxl-4 col-md-4'>
                                    <div className='card info-card sales-card'>
                                        <div className='card-body'>
                                            <h5 className='card-title'>Balance</h5>

                                            <div className='d-flex align-items-center'>
                                                <div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
                                                    <i className='bi bi-wallet2' />
                                                </div>
                                                <div className='ps-3'>
                                                    <h5 style={{ fontFamily: "Roboto, sans-serif" }}>&#8377;&nbsp;0.00</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-xxl-4 col-md-4'>
                                    <div className='card info-card sales-card'>
                                        <div className='card-body'>
                                            <h5 className='card-title'>Income</h5>

                                            <div className='d-flex align-items-center'>
                                                <div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
                                                    <i className='bi bi-cash-stack' />
                                                </div>
                                                <div className='ps-3'>
                                                    <h5 style={{ fontFamily: "Roboto, sans-serif" }}>&#8377;&nbsp;<span style={{ color: "green" }}>0.00</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-xxl-4 col-md-4'>
                                    <div className='card info-card sales-card'>
                                        <div className='card-body'>
                                            <h5 className='card-title'>Expense</h5>

                                            <div className='d-flex align-items-center'>
                                                <div className='card-icon rounded-circle d-flex align-items-center justify-content-center'>
                                                    <i className='bi bi-cash' />
                                                </div>
                                                <div className='ps-3'>
                                                    <h5 style={{ fontFamily: "Roboto, sans-serif" }}>&#8377;&nbsp;<span style={{ color: "red" }}>0.00</span></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Overall Card Amounts Ends */}

                                {/* Line Chart Starts */}
                                <div className='col-12'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <h5 className='card-title mb-4'>Reports</h5>
                                            <LineChartReport />
                                        </div>
                                    </div>
                                </div>
                                {/* Line Chart Ends */}
                                <div className='col-12'>
                                    <div className='card'>
                                        <div className="card-body pb-0">
                                            <h5 className='card-title mb-4'>Budget Report</h5>
                                            <BudgetChart />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Left Side Ends */}

                        {/* Right Side Starts */}
                        <div className="col-lg-4">

                            {/* Recent Transaction Starts */}
                            <div className="card recent-sales">
                                <div className='card-body'>
                                    <h5 className='card-title mb-4'>Recent Transactions</h5>
                                    <div className='activity'>
                                        <div className="activity-item d-flex">
                                            <div className='activite-label'>Income</div>
                                            <i className='bi bi-circle-fill activity-badge align-self-start'></i>
                                            <div className='activity-content'>20000</div>
                                        </div>
                                        <div className="activity-item d-flex">
                                            <div className='activite-label'>Income</div>
                                            <i className='bi bi-circle-fill activity-badge align-self-start'></i>
                                            <div className='activity-content'>20000</div>
                                        </div>
                                        <div className="activity-item d-flex">
                                            <div className='activite-label'>Income</div>
                                            <i className='bi bi-circle-fill activity-badge align-self-start'></i>
                                            <div className='activity-content'>20000</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Recent Transaction Ends */}
                            <div className='card'>
                                <div className="card-body pb-0">
                                    <h5 className='card-title mb-4'>Overall Tracker</h5>
                                    <OverallChart />
                                </div>
                            </div>

                        </div>
                        {/* Right Side Ends */}
                    </div>
                </section>
            </main>
        </>
    );
}

export default Main;
