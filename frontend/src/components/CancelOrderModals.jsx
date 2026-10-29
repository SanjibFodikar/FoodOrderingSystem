import React, { useState } from 'react'

const CancelOrderModals = ({show,handleClose,order_number,payment_mode}) => {
    const [remark, setRemark] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        if (!remark.trim()) {
            setRemark('PLease provide a reason for cancellation')
            return
        }
        const response = await fetch(`http://127.0.0.1:8000/api/cancel_order/${order_number}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'remark': remark
            })
        })
        const data = await response.json()
        if (response.ok) {
            let msg=data.message
            console.log(msg)
            if (payment_mode === 'online') {
                msg+='/n Since You Paid Online , Your Payment will be refunded to your account wirhin 2 days'
            }
            setMessage(msg)
            setRemark('')
            setError('')
        }else{
            setError(data.message || 'Failed to cancel order')
        }
    }

    return (
        <div className={`modal fade ${show ? 'show d-block' : ''}`} tabindex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Cancel Order #{order_number}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>
                    <div className="modal-body">
                        {message ? 
                        <>
                           <div className='alert alert-success'>{message}</div>
                        </> :<>
                         <label>Reason For Cancellation</label>
                         <textarea name="" className='form-control mt-3' rows={'4'} placeholder='Enter Reason Here'
                         value={remark}
                         onChange={(e)=>setRemark(e.target.value)}
                         ></textarea>
                        </>}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                        <button type="button" className="btn btn-danger" onClick={handleSubmit}>Cancel Order</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CancelOrderModals
