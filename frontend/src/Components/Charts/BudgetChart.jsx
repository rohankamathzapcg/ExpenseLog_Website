import * as echarts from 'echarts';
import React, { useEffect } from 'react';

const BudgetChart = () => {

    useEffect(() => {
        echarts.init(document.querySelector('#budgetChart')).setOption({
            legend: {
                data: ["Actual Budget", "Actual Spending"],
            },
            radar: {
                shape: 'circle',
                indicator: [
                    {
                        name: "Shopping",
                        max: 6500,
                    },
                    {
                        name: 'Food',
                        max: 16000,
                    },
                    {
                        name: 'Rent',
                        max: 30000,
                    },
                    {
                        name: 'Education',
                        max: 38000,
                    },
                ],
            },
            series: [
                {
                    name: 'Budget vs Spending',
                    type: 'radar',
                    data: [
                        {
                            name: "Actual Budget",
                            value: [4200, 3000, 20000, 35000],
                        },
                        {
                            name: "Actual Spending",
                            value: [5000, 14000, 28000, 26000],
                        },
                    ],
                },
            ],
        });
    }, []);
  return (
    <>
      <div id="budgetChart" style={{ minHeight: '400px' }} className='echart'></div>
    </>
  );
}

export default BudgetChart;
