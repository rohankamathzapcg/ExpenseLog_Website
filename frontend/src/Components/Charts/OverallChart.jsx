import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const OverallChart = (props) => {
    useEffect(() => {
        echarts.init(document.querySelector('#overallTracker')).setOption({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                top: '5%',
                left: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ["50%", "70%"],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: "center",
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: "10",
                            fontWeight: 'bold',
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data: [
                        {
                            value: props.expenseValue,
                            name: 'Expense',
                        },
                        {
                            value: props.incomeValue,
                            name: 'Income',
                        },
                    ],
                },
            ],
        });
    })
    return (
        <>
            <div id="overallTracker" className='echart' style={{ minHeight: '312px' }}></div>
        </>
    );
}

export default OverallChart;
