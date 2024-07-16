import * as echarts from 'echarts';
import React, { useEffect } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'

const BudgetChart = () => {
    const data = [
        {
            name: "Page A",
            uv: 4000,
        },
        {
            name: "Page B",
            uv: 3000,

        },
        {
            name: "Page C",
            uv: 2000,

        },
        {
            name: "Page D",
            uv: 2780,

        },
        {
            name: "Page E",
            uv: 1890,

        },
        {
            name: "Page F",
            uv: 2390,

        },
        {
            name: "Page G",
            uv: 3490,

        }
    ]
    return (
        <>
            <div className='echart'>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default BudgetChart;
