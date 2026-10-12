import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout';
import { useParams, useNavigate, Link, useActionData } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';

const PaymentPage = () => {
    const userId = localStorage.getItem('userId')
    const [address, setAdress] = useState('')
    const [paymentMode, setPaymentMode] = useState('')
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiry: '',
        cvv: ''
    })
    const navigate = useNavigate()

    const handlePlaceOrder = async () => {
        if (paymentMode === "online") {
            const { cardNumber, expiry, cvv } = cardDetails

            if (!cardNumber || !expiry || !cvv) {
                toast.error('Please Fill All Card Details')
                return
            }
        }
            try {
                let response = await fetch(`http://127.0.0.1:8000/api/place_order/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        'userId': userId,
                        'address': address,
                        'paymentMode': paymentMode,
                        'cardNumber': paymentMode === 'online' ? cardDetails.cardNumber : '',
                        'expiry': paymentMode === 'online' ? cardDetails.expiry : '',
                        'cvv': paymentMode === 'online' ? cardDetails.cvv : ''
                    })
                })
                let data = await response.json()
                if (response.status === 201) {
                    toast.success(data.message)
                    setTimeout(() => {
                        navigate('/my-orders')
                    }, 2000)
                } else {
                    toast.error(data.message)
                }
            } catch (error) {
                console.log(error)
            }
    }
    return (
        <PublicLayout>
            <ToastContainer />
            <div className="container py-5" style={{ marginTop: '70px' }}>
                <h3 className='text-primary text-center'><i className='bi bi-credit-card me-1'></i>Checkout & Payment</h3>

                <div className="card p-4 shadow-sm">
                    <div className="mb-3">
                        <label htmlFor="" className='form-label fw-semibold'>Delivery Address</label>
                        <textarea name="" className='form-control border-primary-subtle' id="" placeholder='Enter your full delivery address'
                            required
                            onChange={(e) => setAdress(e.target.value)} value={address} rows={3}
                        ></textarea>
                    </div>

                    <div className="mb-3"> <input type="radio" required name="paymentMode" className="form-check-input" id="cod" value="cod" checked={paymentMode === "cod"} onChange={() => setPaymentMode("cod")} /> <label htmlFor="cod" className="form-check-label fw-semibold ms-2" > Cash On Delivery </label> </div>

                    <div className="mb-3"> <input type="radio" required name="paymentMode" className="form-check-input" id="cod" value="online" checked={paymentMode === "online"} onChange={() => setPaymentMode("online")} /> <label htmlFor="cod" className="form-check-label fw-semibold ms-2" > Online Payment </label> </div>

                    {paymentMode === 'online' && (
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="cardNumber" className="form-label" > Card Number </label>
                                    <input type="text" name="cardNumber" className="form-control" id="" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({...cardDetails,cardNumber:e.target.value})} 
                                    placeholder='Enter Card Number'
                                    />
                                </div>
                            </div>

                            <div className="col-12 col-md-3">
                                <div className="mb-3">
                                    <label htmlFor="expiry" className="form-label" > Expiry </label>
                                    <input type="text" name="expiry" className="form-control" id="" value={cardDetails.expiry} onChange={(e) => setCardDetails({...cardDetails,expiry:e.target.value})}
                                    placeholder='MM/YY'
                                    />
                                </div>
                            </div>


                            <div className="col-12 col-md-3">
                                <div className="mb-3">
                                    <label htmlFor="cvv" className="form-label" > CVV </label>
                                    <input type="text" name="cvv" className="form-control" id="" value={cardDetails.cvv} onChange={(e) => setCardDetails({...cardDetails,cvv:e.target.value})}
                                     placeholder='Enter cvv'
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <button className='btn btn-success mt-4 w-100' onClick={handlePlaceOrder}>
                        <i className='fas fa-check-circle me-2'></i>
                        Confirm & Place Order
                    </button>
                </div>

            </div>
        </PublicLayout>

    )
}

export default PaymentPage
