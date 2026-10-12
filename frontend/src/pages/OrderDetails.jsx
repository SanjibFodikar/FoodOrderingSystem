import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout';
import { useParams, useNavigate, Link, useActionData } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';

const OrderDetails = () => {
    const { order_number } = useParams()
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [orderItems, setOrderItems] = useState([])
    const [orderAddress, setOrderAddress] = useState(null)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        if (!userId) {
            navigate('/user-login')
            return
        }

        fetch(`http://127.0.0.1:8000/api/orders/order_number/${order_number}`)
            .then(a => a.json())
            .then(data => {
                console.log(data)
                setOrderItems(data)
                const total = data.reduce((sum, item) => {
                    return sum + item.food.item_price * item.quantity
                }, 0)
                setTotal(total)
            })

        fetch(`http://127.0.0.1:8000/api/orders/order_address/${order_number}`)
            .then(a => a.json())
            .then(data => {
                console.log(data)
                setOrderAddress(data)
            })


    }, [order_number])
    return (
        <PublicLayout>
            <div className="container py-3" style={{ marginTop: '70px' }}>
                <h3 className="mb-2 text-primary">
                    <i className="fas fa-receipt fs-4"></i> Order #{order_number} Details
                </h3>
                <div className="row">
                    <div className="col-md-8">
                        {orderItems.map((item, index) => {

                            return (
                                <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4" key={index}>
                                    <div className="row g-0">

                                        {/* Food Image */}
                                        <div className="col-md-4">
                                            <img
                                                src={`http://127.0.0.1:8000/${item.food.image}`}
                                                className="img-fluid w-100 h-100"
                                                style={{
                                                    minHeight: '250px',
                                                    maxHeight: '300px',
                                                    objectFit: 'cover'
                                                }}
                                                alt={item.food.item_name}
                                            />
                                        </div>

                                        {/* Food Details */}
                                        <div className="col-md-8">
                                            <div className="card-body p-4">

                                                <div className="d-flex justify-content-between align-items-start mb-2">
                                                    <h4 className="fw-bold text-dark mb-0">
                                                        <i className="bi bi-egg-fried text-warning me-2"></i>
                                                        {item.food.item_name}
                                                    </h4>

                                                    <span className="badge bg-success-subtle text-success rounded-pill px-3 py-2">
                                                        <i className="bi bi-check-circle-fill me-1"></i>
                                                        Ordered
                                                    </span>
                                                </div>

                                                <p className="text-muted mb-3">
                                                    {item.food.item_description}
                                                </p>

                                                <div className="row g-3 mb-3">

                                                    {/* Price */}
                                                    <div className="col-sm-6">
                                                        <div className="bg-light rounded-3 p-3 h-100">
                                                            <small className="text-muted d-block mb-1">
                                                                <i className="bi bi-tag-fill me-1"></i>
                                                                Unit Price
                                                            </small>
                                                            <h5 className="fw-bold text-primary mb-0">
                                                                ₹{item.food.item_price}
                                                            </h5>
                                                        </div>
                                                    </div>

                                                    {/* Quantity */}
                                                    <div className="col-sm-6">
                                                        <div className="bg-light rounded-3 p-3 h-100">
                                                            <small className="text-muted d-block mb-1">
                                                                <i className="bi bi-basket-fill me-1"></i>
                                                                Quantity
                                                            </small>
                                                            <h5 className="fw-bold mb-0">
                                                                {item.quantity}
                                                            </h5>
                                                        </div>
                                                    </div>

                                                </div>

                                                <hr className="border-secondary-subtle" />

                                                {/* Total */}
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        <small className="text-muted d-block">
                                                            <i className="bi bi-receipt me-1"></i>
                                                            Item Total
                                                        </small>
                                                        <h3 className="fw-bold text-success mb-0">
                                                            ₹{item.food.item_price * item.quantity}
                                                        </h3>
                                                    </div>

                                                    <div className="bg-success bg-opacity-10 text-success rounded-circle p-3">
                                                        <i className="bi bi-bag-check-fill fs-3"></i>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            );

                        })}

                    </div>

                    <div className="col-md-4">
                        {orderAddress && (
                            <>
                                <div className="card border-0 shadow rounded-4 overflow-hidden">
                                    {/* Card Header */}
                                    <div className="card-header bg-primary text-white p-3 border-0">
                                        <h5 className="mb-0 fw-bold">
                                            <i className="bi bi-geo-alt-fill me-2"></i>
                                            Delivery Details
                                        </h5>
                                        <small className="opacity-75">Your order information</small>
                                    </div>

                                    {/* Card Body */}
                                    <div className="card-body p-4">

                                        <div className="d-flex align-items-start gap-3 mb-4">
                                            <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3">
                                                <i className="bi bi-calendar-check fs-4"></i>
                                            </div>
                                            <div>
                                                <small className="text-muted d-block">Order Date</small>
                                                <span className="fw-semibold">
                                                    {orderAddress.order_time
                                                        ? new Date(orderAddress.order_time).toLocaleDateString()
                                                        : 'Not Available'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-start gap-3 mb-4">
                                            <div className="bg-success bg-opacity-10 text-success rounded-3 p-3">
                                                <i className="bi bi-house-door-fill fs-4"></i>
                                            </div>
                                            <div>
                                                <small className="text-muted d-block">Delivery Address</small>
                                                <span className="fw-semibold">
                                                    {orderAddress.address || 'Address not available'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-start gap-3 mb-4">
                                            <div className="bg-warning bg-opacity-10 text-warning rounded-3 p-3">
                                                <i className="bi bi-clock-history fs-4"></i>
                                            </div>
                                            <div>
                                                <small className="text-muted d-block">Order Status</small>
                                                <span className="badge bg-warning-subtle text-dark rounded-pill px-3 py-2">
                                                    <i className="bi bi-hourglass-split me-1"></i>
                                                    {orderAddress.order_final_status ||
                                                        'Waiting For Restaurant Confirmation'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-start gap-3 mb-4">
                                            <div className="bg-info bg-opacity-10 text-info rounded-3 p-3">
                                                <i className="bi bi-credit-card-fill fs-4"></i>
                                            </div>
                                            <div>
                                                <small className="text-muted d-block">Payment Mode</small>
                                                <span className="fw-semibold">
                                                    {orderAddress.payment_mode || 'Not Available'}
                                                </span>
                                            </div>
                                        </div>

                                        <hr className="border-secondary-subtle" />

                                        {/* Total Amount */}
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <div>
                                                <small className="text-muted">Total Amount</small>
                                                <h4 className="text-success fw-bold mb-0">
                                                    <i className="bi bi-currency-rupee"></i>
                                                    {total}
                                                </h4>
                                            </div>
                                            <div className="bg-success bg-opacity-10 text-success rounded-circle p-3">
                                                <i className="bi bi-bag-check-fill fs-3"></i>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="d-grid gap-2">
                                            <a
                                                href={`http://127.0.0.1:8000/api/invoice/${order_number}`}
                                                target='_blank'
                                                className="btn btn-primary rounded-3 py-2 fw-semibold"
                                            >
                                                <i className="bi bi-receipt me-2"></i>
                                                Download Invoice
                                            </a>

                                            <button
                                                type="button"
                                                className="btn btn-outline-danger rounded-3 py-2 fw-semibold"
                                            >
                                                <i className="bi bi-x-circle me-2"></i>
                                                Cancel Order
                                            </button>
                                        </div>

                                    </div>
                                </div>

                            </>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}

export default OrderDetails
