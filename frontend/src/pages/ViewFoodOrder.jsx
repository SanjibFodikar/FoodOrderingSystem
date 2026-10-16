import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
const ViewFoodOrder = () => {
    const navigate = useNavigate()
    const { order_number } = useParams()
    const [data, setData] = useState(null)
    useEffect(() => {
        const username = localStorage.getItem('admin_userId')
        if (!username) {
            navigate('/admin-login')
        }

        fetch(`http://127.0.0.1:8000/api/view_order_details/${order_number}`)
            .then(a => a.json())
            .then(data => {
                console.log(data)
                setData(data)
            })

    }, [order_number])

    if (!data) {
        return <AdminLayout><p className='mt-5 text-center'>Loading ....</p></AdminLayout>
    }

    const { order, foods, tracking } = data
    const statusOptions = [
        "Order Confirmed",
        "Food Being Prepared",
        "Food Pickup",
        "Food Delivered",
        "Order Cancelled"
    ]

    const currentStatus = order.order_final_status || '';
    const visibleOptions = statusOptions.slice(statusOptions.indexOf(currentStatus) + 1)

    return (
        <AdminLayout>
            <ToastContainer />
            <div className="container mt-2">
                <h3 className='text-center text-primary'>Order Details # {order.order_number}</h3>
                <div className="row">

                    <div className="col-12 col-lg-6">
                        <h3 className='text-center'>User Info</h3>
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Full Name</th>
                                    <td>{order.user_full_name}</td>
                                </tr>
                                <tr>
                                    <th>Email</th>
                                    <td>{order.user_email}</td>
                                </tr>
                                <tr>
                                    <th>Mobile</th>
                                    <td>{order.user_mobile}</td>
                                </tr>
                                <tr>
                                    <th>Address</th>
                                    <td>{order.address}</td>
                                </tr>
                                <tr>
                                    <th>Order Time</th>
                                    <td>{new Date(order.order_time).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th>Order Final Status</th>
                                    <td>{order.order_final_status || 'Pending'}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>


                    <div className="col-12 col-lg-6">
                        <h3 className='text-center'>Ordered Food</h3>
                        <table className='table table-bordered'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map((food, index) => {
                                    return <tr key={index}>
                                        <td><img src={`http://127.0.0.1:8000${food.image}`} alt="images" width={'100px'} /></td>
                                        <td>{food.item_name}</td>
                                        <td>{food.item_price}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>

                <div className="row mt-2">
                    <h3 className='text-center'>Tracking History</h3>
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Status</th>
                                <th>Remark</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tracking.length > 0 ? (
                                tracking.map((track, index) => {
                                    return <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{track.status}</td>
                                        <td>{track.remark}</td>
                                        <td>{new Date(track.status_date).toLocaleString()}</td>
                                    </tr>
                                })
                            ) : (
                                <tr><td colSpan={3} className='text-center'>No Tracking History Found</td></tr>
                            )}

                        </tbody>
                    </table>
                </div>

                {order.order_final_status !== 'Food Delivered' && (
                    <div>
                        <div className="mt-4">
                            <h5>Update Order Status</h5>
                            <form action="" onSubmit={(e) => {
                                e.preventDefault()
                                let status = e.target.status.value;
                                let remark = e.target.remark.value
                                fetch('http://127.0.0.1:8000/api/update_order_status/', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        'order_number': order.order_number,
                                        'status': status,
                                        'remark': remark
                                    })

                                })
                                    .then(a => a.json())
                                    .then(data => {
                                        if (data.message) {
                                            toast.success(data.message)
                                            setTimeout(() => {
                                                window.location.reload()
                                            }, 1000)
                                        } else {
                                            toast.error("Failed to update status")
                                        }
                                    })

                            }}>
                                <div className="mb-3">
                                    <label htmlFor="">Status</label>
                                    <select name="status" id="" className='form-control' required>
                                        {visibleOptions.map((status, index) => {
                                            return <option key={index} value={status}>{status}</option>
                                        })}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="">Remark</label>
                                    <textarea name="remark" className='form-control' rows={3} id=""></textarea>
                                </div>

                                <div className="mb-3 text-center">
                                    <button className='btn btn-primary'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


            </div>
        </AdminLayout>
    )
}

export default ViewFoodOrder
