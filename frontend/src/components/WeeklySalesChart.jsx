import React, { useState, useEffect } from 'react'
import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer} from 'recharts'


const WeeklySalesChart = () => {
  const [dataGraph, setData] = useState([])
  
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/weekly_sales_summary/')
        .then(a=>a.json())
        .then(data=>{
          console.log(data)
           setData(data)
        })
        
    }, [])
  
    return (
      <div className='card p-3 shadow'>
        <h4 style={{color:'#198757'}}>Weekly Sales</h4>
         <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dataGraph}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill='#198757' />
            </BarChart>
         </ResponsiveContainer>
      </div>
    )
}

export default WeeklySalesChart
