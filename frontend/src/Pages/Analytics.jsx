import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import LineChartReport from '../Components/Charts/LineChartReport';
import BudgetChart from '../Components/Charts/BudgetChart';
import OverallChart from '../Components/Charts/OverallChart';
import { useAuth } from '../Context/AuthContext';
import axios from 'axios';
import ChartFilter from '../Components/ChartFilter';

const Analytics = () => {

  const [donutFilter, setDonutFilter] = useState('Today');
  const [expense, setExpense] = useState(0);
  const [income, setIncome] = useState(0);
  const [barFilter, setBarFilter] = useState('Today');
  const [categoryData, setCategoryData] = useState({})
  const { authUser } = useAuth();

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const handleBarFilterChange = (filter) => {
    setBarFilter(filter)

    if (filter === "Today") {

    } else if (filter === "This Month") {

      axios.get(`https://localhost:7026/api/Analytics/total-expense-by-category-this-month?email=${encodeURIComponent(authUser.emailID)}&month=${encodeURIComponent(month)}&year=${encodeURIComponent(year)}`)
        .then((result) => {
          if (result.status === 200) {
            setCategoryData(result.data);
          } else if (result.status === 202) {
            setCategoryData({});
          }
        })
        .catch((err) => console.log(err))

    } else if (filter === "This Year") {

      axios.get(`https://localhost:7026/api/Analytics/total-expense-by-category-this-year?email=${encodeURIComponent(authUser.emailID)}&year=${encodeURIComponent(year)}`)
        .then((result) => {
          if (result.status === 200) {
            setCategoryData(result.data);
          } else if (result.status === 202) {
            setCategoryData({});
          }
        })
        .catch((err) => console.log(err))

    } else if (filter === "This Week") {

    }

  }

  const handleDonutFilterChange = (filter) => {
    setDonutFilter(filter)

    if (filter === "Today") {

      axios.get(`https://localhost:7026/api/Analytics/total-expense-today?email=${encodeURIComponent(authUser.emailID)}&date=${encodeURIComponent(day)}&month=${encodeURIComponent(month)}&year=${encodeURIComponent(year)}`)
        .then((result) => {
          if (result.status === 200) {
            setExpense(result.data);
          } else if (result.status === 202) {
            setExpense(0);
          }
        })
        .catch((err) => console.log(err))

      axios.get(`https://localhost:7026/api/Analytics/total-income-today?email=${encodeURIComponent(authUser.emailID)}&date=${encodeURIComponent(day)}&month=${encodeURIComponent(month)}&year=${encodeURIComponent(year)}`)
        .then((result) => {
          if (result.status === 200) {
            setIncome(result.data);
          } else if (result.status === 202) {
            setIncome(0);
          }
        })
        .catch((err) => console.log(err))

    } else if (filter === "This Month") {

      axios.get(`https://localhost:7026/api/Analytics/total-expense-by-month?email=${encodeURIComponent(authUser.emailID)}&year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}`)
        .then((result) => {
          if (result.status === 200) {
            setExpense(result.data);
          } else if (result.status === 202) {
            setExpense(0);
          }
        })
        .catch((err) => console.log(err))

      axios.get(`https://localhost:7026/api/Analytics/total-income-by-month?email=${encodeURIComponent(authUser.emailID)}&year=${encodeURIComponent(year)}&month=${encodeURIComponent(month)}`)
        .then((result) => {
          if (result.status === 200) {
            setIncome(result.data);
          } else if (result.status === 202) {
            setIncome(0);
          }
        })
        .catch((err) => console.log(err))

    } else if (filter === "This Year") {

      axios.get(`https://localhost:7026/api/Analytics/total-income-this-year?email=${encodeURIComponent(authUser.emailID)}&year=${encodeURIComponent(year)}`)
        .then((result) => {
          if (result.status === 200) {
            setIncome(result.data);
          } else if (result.status === 202) {
            setIncome(0);
          }
        })
        .catch((err) => console.log(err))

      axios.get(`https://localhost:7026/api/Analytics/total-expense-this-year?email=${encodeURIComponent(authUser.emailID)}&year=${encodeURIComponent(year)}`)
        .then((result) => {
          if (result.status === 200) {
            setExpense(result.data);
          } else if (result.status === 202) {
            setExpense(0);
          }
        })
        .catch((err) => console.log(err))

    } else if (filter === "This Week") {

      // axios.get(`https://localhost:7026/api/Analytics/total-income-this-year?email=${encodeURIComponent(authUser.emailID)}&year=${encodeURIComponent(year)}`)
      //   .then((result) => {
      //     if (result.status === 200) {
      //       setIncome(result.data);
      //     } else if (result.status === 202) {
      //       setIncome(0);
      //     }
      //   })
      //   .catch((err) => console.log(err))

      // axios.get(`https://localhost:7026/api/Analytics/total-expense-this-year?email=${encodeURIComponent(authUser.emailID)}&year=${encodeURIComponent(year)}`)
      //   .then((result) => {
      //     if (result.status === 200) {
      //       setExpense(result.data);
      //     } else if (result.status === 202) {
      //       setExpense(0);
      //     }
      //   })
      //   .catch((err) => console.log(err))
    }
  }

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
                        <h5 className='card-title mb-4'>Reports | <span>This Week</span></h5>
                        <LineChartReport />
                      </div>
                    </div>
                  </div>
                  {/* Line Chart Ends */}

                  <div className='col-12'>
                    <div className='card'>
                      <ChartFilter filterChange={handleBarFilterChange} />
                      <div className="card-body pb-0">
                        <h5 className='card-title mb-4'>Expense Report | <span>{barFilter}</span></h5>
                        <BudgetChart data={categoryData} />
                      </div>
                    </div>
                  </div>

                  <div className='card'>
                    <ChartFilter filterChange={handleDonutFilterChange} />
                    <div className="card-body pb-0">
                      <h5 className='card-title mb-4'>Overall Tracker | <span>{donutFilter}</span></h5>
                      <OverallChart expenseValue={expense} incomeValue={income} />
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
