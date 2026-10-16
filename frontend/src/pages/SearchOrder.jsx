import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const SearchOrder = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const username = localStorage.getItem('admin_userId')
        if (!username) {
            navigate('/admin-login')
        }

    }, [])

    const handleSearch = async (e) => {
        const value = e.target.value
        setSearchTerm(value)
        if (!value.trim()) {
            setOrders([])
            return
        }
        let response = await fetch(`http://127.0.0.1:8000/api/order_search/?q=${searchTerm}`)
        let data = await response.json()
        setOrders(data)

    }

    return (
        <AdminLayout>
            <div className="container">
                <h3 className='text-center text-primary'><i className="bi bi-list-check me-2"></i>Search Orders</h3>
                <div className="row mt-3">

                    <div className="col-12 col-md-6 col-lg-8">
                        <form onSubmit={handleSearch}>
                            <div className="input-group shadow-sm">
                                <span className="input-group-text bg-white">
                                    <i className="fa-solid fa-magnifying-glass text-success"></i>
                                </span>

                                <input
                                    className="form-control"
                                    type="search"
                                    name="search"
                                    onChange={handleSearch}
                                    value={searchTerm}
                                    placeholder="Enter Order Number"
                                    aria-label="Search orders"
                                />
                            </div>
                        </form>
                    </div>


                </div>

                <table className='table table-striped mt-5'>
                    <thead className='table-dark'>
                        <tr>
                            <th>S.no</th>
                            <th>Order Number</th>
                            <th>Order Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length == 0 ? (
                            <tr>
                                <td colSpan={4} className='text-center'><strong>No Record Found</strong></td>
                            </tr>

                        ) : (
                            orders.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order.order_number}</td>
                                        <td>{new Date(order.order_time).toLocaleString()}</td>
                                        <td><Link to={`/admin-view-order-details/${order.order_number}`} className='btn btn-primary'><i className='bi bi-eye me-1'></i>View Details </Link></td>
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

export default SearchOrder
