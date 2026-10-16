import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data,Link } from 'react-router-dom';
const BeingPrepared = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const username = localStorage.getItem('admin_userId')
        if (!username) {
            navigate('/admin-login')
        }

        fetch('http://127.0.0.1:8000/api/food_being_prepared/')
        .then(a=>a.json())
        .then(data=>{
           setOrders(data)
        })
    }, [])

    return (
        <AdminLayout>
            <ToastContainer />
            <div className="container">
                <h3 className='text-center text-primary'><i className="bi bi-list-check me-2"></i>Detail of Food Being Prepared</h3>
                <h5 className='text-end'><i className="bi bi-database me-1"></i> Food Being Prepared
                    <span className='ms-2 badge bg-success'>{orders.length}</span>
                </h5>

                <table className='table table-striped'>
                    <thead className='table-dark'>
                         <tr>
                            <th>S.no</th>
                            <th>Order Number</th>
                            <th>Order Date</th>
                            <th>Action</th>
                         </tr>
                    </thead>
                    <tbody>
                        {orders.length == 0 ?(
                            <tr>
                                <td colSpan={4} className='text-center'><strong>No Data Found</strong></td>
                            </tr> 

                        ) :(
                            orders.map((order,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{order.order_number}</td>
                                        <td>{new Date (order.order_time).toLocaleString()}</td>
                                        <td><a href="#" className='btn btn-primary'><i className='bi bi-pencil-square me-1'></i>Edit</a></td>
                                    </tr>
                                )
                            })
                           
                        )}
                    </tbody>
                </table>

            </div>
        </AdminLayout>
    )
}

export default BeingPrepared
