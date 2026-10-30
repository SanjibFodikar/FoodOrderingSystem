import PublicLayout from "../components/PublicLayout"
import '../styles/home.css'
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/track.css'

const TrackOrder = () => {
    const [orderNumber, setOrderNumber] = useState('')
    const [TrackingData, setTrackingData] = useState([])
    const { order_number } = useParams()
    useEffect(() => {
        if (order_number) {
            setOrderNumber(order_number)
            handleTrack(order_number)
        }
    }, [order_number])

    const handleTrack = async (order_number) => {
        const response = await fetch(`http://127.0.0.1:8000/api/track_order/${order_number}/`)
        const data = await response.json()
        setTrackingData(data)
        console.log(data)
    }

    const bg_apply = (status) => {
        switch (status) {
            case 'Order Confirmed': return 'bg-info'
            case 'Food Being Prepared': return 'bg-warning'
            case 'Food Pickup': return 'bg-primary'
            case 'Food Delivered': return 'bg-success'
            case 'Order Cancelled': return 'bg-danger'
            default: 'bg-dark';
        }
    }

    return (
        <PublicLayout>
            <div className="container" style={{ marginTop: '100px' }}>
                <div className="row">
                    <h4 className="text-primary"><i className="bi bi-geo-alt me-2"></i>Track Your Order</h4>

                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-receipt"></i>
                        </span>

                        <input
                            type="text"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            placeholder="Enter your order number"
                            name="order_number"
                            className="form-control"
                        />

                        <button className="btn btn-primary" onClick={()=>handleTrack(orderNumber)}>
                            <i className="fas fa-map-marker-alt me-2"></i>
                            Track Order
                            <i className="fas fa-arrow-right ms-2"></i>
                            
                        </button>
                    </div>
                </div>

                {TrackingData.length > 0 && (
                    <div className="card p-4 shadow-sm rounded-4 border-0">
                        <h5 className="mb-4 text-primary">
                            <i className="fas fa-stream me-1"></i> Order Status Timeline
                        </h5>

                        <div className="d-flex justify-content-between flex-fill position-relative timeline-container">
                            <div className="timeline-line"></div>
                            {TrackingData.map((item, index) => {
                                return (
                                    <div className="timeline-step" key={index}>
                                        <div className={`icon text-white ${bg_apply(item.status)} mx-auto`}>
                                            <i className="fas fa-check"></i>
                                        </div>

                                        <small className="fw-bold d-block">{item.status}</small>
                                        <small className="text-muted">{new Date(item.status_date).toDateString()}</small>
                                    </div>

                                )
                            })}
                        </div>

                        <h6 style={{ marginTop: '50px' }}>Detailed History</h6>
                        <ul className="list-group">
                            {TrackingData.map((item, index) => {
                                return (
                                    <li className="list-group-item" key={index}>
                                        <span className={`badge ${bg_apply(item.status)}`}>{item.status}</span>
                                        <span className="text-muted ms-2">{new Date(item.status_date).toDateString()}</span>
                                        {item.order_cancelled_by_user && (
                                            <>
                                             <span className={`badge ${bg_apply(item.status)}`}>Cancelled Order By User</span>
                                            </>
                                        )}
                                    </li>

                                )
                            })}
                        </ul>

                    </div>


                )}
            </div>
        </PublicLayout>
    )
}

export default TrackOrder
