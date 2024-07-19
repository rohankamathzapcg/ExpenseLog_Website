import React from 'react'
import { ToastContainer } from 'react-toastify';
import LineChartReport from '../Components/Charts/LineChartReport';
import BudgetChart from '../Components/Charts/BudgetChart';
import OverallChart from '../Components/Charts/OverallChart';

const Analytics = () => {
  return (
    <>
      <ToastContainer />
      <main id="main" className='main'>
        <div className='pagetitle'>
          <h1>Analytics</h1>
          <section className='dashboard section mt-3'>
            <div className='row'>
              <div className="col-lg-12">
                <div className="row">

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

                  <div className='card'>
                    <div className="card-body pb-0">
                      <h5 className='card-title mb-4'>Overall Tracker</h5>
                      <OverallChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Analytics
