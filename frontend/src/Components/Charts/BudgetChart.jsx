import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'

const BudgetChart = (props) => {
    return (
        <>
            <div className='echart'>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={props.data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="key" />
                        <YAxis label={{ value: "Amount (₹)", angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

export default BudgetChart;
