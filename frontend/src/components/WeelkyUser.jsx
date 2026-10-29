import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'

const WeelkyUser = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/weekly_total_users/')
            .then(a => a.json())
            .then(data => {
                console.log(data)
                setUsers(data)
            })

    }, [])
    return (
        <div className='card p-3 shadow'>
            <h4 style={{ color: '#008827' }}>Weekly Users</h4>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={users}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="new_users" fill='#008827' />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default WeelkyUser
