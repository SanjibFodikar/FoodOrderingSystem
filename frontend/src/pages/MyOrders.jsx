import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout';
import { useParams, useNavigate, Link, useActionData } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';

const MyOrders = () => {
    const navigate = useNavigate()
    const [myorders, setMyorders] = useState([])
    const userId = localStorage.getItem('userId')
    useEffect(() => {
        if (!userId) {
            navigate('/user-login')
            return
        }

        fetch(`http://127.0.0.1:8000/api/my_orders/${userId}`)
            .then(a => a.json())
            .then(data => {
                setMyorders(data)
                console.log(data)
            })

    }, [userId])
    return (
        <PublicLayout>
            <div className="container" style={{ marginTop: '100px' }}>
                <h4 className='text-center text-primary'><i className='bi bi-bag-check me-1'></i> My Orders</h4>
                {myorders.length === 0 ? (
                    <div>
                        <h3 className='text-muted text-center'>No orders are placed</h3>
                    </div>
                ) : (

                    <>
                        {myorders.map((order, index) => (
                            <div className="card border-0 shadow-sm rounded-4 mb-3"
                                key={order.id || index}>

                                <div className="card-body p-3 p-md-4">
                                    <div className="row align-items-center g-3">

                                        {/* Order Icon */}
                                        <div className="col-auto">
                                            <div
                                                className="rounded-circle d-flex align-items-center justify-content-center"
                                                style={{
                                                    width: '65px',
                                                    height: '65px',
                                                    backgroundColor: '#fff3e0'
                                                }}
                                            >
                                                <i className="bi bi-bag-check-fill text-warning fs-2"></i>
                                            </div>
                                        </div>

                                        {/* Order Information */}
                                        <div className="col">
                                            <Link>
                                                Order #{order.order_number}
                                            </Link>

                                            <p className="text-muted small mb-2">
                                                <i className="bi bi-calendar3 me-2"></i>
                                                {new Date(order.order_time).toLocaleDateString('en-IN')}
                                            </p>

                                            <span className="badge rounded-pill bg-success-subtle text-success px-3 py-2">
                                                <i className="bi bi-check-circle-fill me-1"></i>
                                                {order.order_final_status}
                                            </span>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="col-12 col-md-auto">
                                            <div className="d-flex flex-wrap gap-2">

                                                <Link
                                                    to={'#'}
                                                    className="btn btn-outline-primary rounded-pill px-3"
                                                >
                                                    <i className="bi bi-geo-alt me-1"></i>
                                                    Track Order
                                                </Link>

                                                <Link
                                                    to={`/order-details/${order.order_number}`}
                                                    className="btn btn-primary rounded-pill px-3"
                                                >
                                                    <i className="bi bi-eye me-1"></i>
                                                    View Details
                                                </Link>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </>

                )}
            </div>
        </PublicLayout>
    )
}

export default MyOrders
