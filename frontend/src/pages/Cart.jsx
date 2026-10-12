import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout';
import { useParams, useNavigate, Link, useActionData } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [grandTotal, setGrandToatal] = useState(0)
  const userId = localStorage.getItem('userId')
  useEffect(() => {
    if (!userId) {
      navigate('/user-login')
      return
    }
    fetchCardItems()
  }, [userId])

  const fetchCardItems = () => {
    fetch(`http://127.0.0.1:8000/api/all_cart/${userId}`)
      .then(a => a.json())
      .then(data => {
        setCartItems(data)
        const total = data.reduce((sum, item) => {
          return sum + item.food.item_price * item.quantity
        }, 0)
        setGrandToatal(total)
      })


  }

  const updateQuantity = async (orderId, newQuantity) => {
    if (newQuantity < 1) {
      return
    }

    try {
      let response = await fetch(`http://127.0.0.1:8000/api/cart_update_quantity/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'orderId': orderId,
          'newQuantity': newQuantity
        })
      })
      let data = await response.json()
      if (response.status === 200) {
        fetchCardItems()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleDelete = async (orderId) => {
    let confirm=window.confirm("Are you sure wanted to delete item")
    if (!confirm) {
      return
    }
    try {
      let response = await fetch(`http://127.0.0.1:8000/api/cart_delete/${orderId}/`, {
        method: 'DELETE'
      })
      let data = await response.json()
      if (response.status === 200) {
        toast.success(data.message)
        fetchCardItems()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <PublicLayout>
      <div className="container py-5" style={{ marginTop: '70px' }}>
        <h2 className='text-center text-primary'><i className='bi bi-cart me-1'></i>Your Cart</h2>
        {cartItems.length == 0 ? (
          <>
            <h2 className='text-muted text-center mb-2'>Cart Is Not Available</h2>
          </>
        ) : (
          <>
            <div className="row">
              {cartItems.map((item) => {
                return (<>
                  <div className="col-12 col-md-6" key={item.id}>
                    <div className="card border-1 shadow rounded-4 overflow-hidden h-100">

                      <div className="row g-0">

                        {/* Food Image */}
                        <div className="col-4">
                          <img
                            src={`http://127.0.0.1:8000${item.food.image}`}
                            className="img-fluid h-100"
                            alt={item.food.item_name}
                            style={{
                              minHeight: "220px",
                              width: "100%",
                              objectFit: "cover"
                            }}
                          />
                        </div>

                        {/* Food Details */}
                        <div className="col-8">
                          <div className="card-body d-flex flex-column h-100">

                            {/* Food Name */}
                            <h5 className="fw-bold mb-1">
                              {item.food.item_name}
                            </h5>

                            {/* Description */}
                            <p
                              className="text-muted small mb-2"
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden"
                              }}
                            >
                              {item.food.item_description}
                            </p>

                            {/* Quantity Available */}
                            <small className="text-secondary mb-2">
                              Available: {item.food.item_quantity}
                            </small>

                            {/* Price */}
                            <h5 className="fw-bold text-success mb-3">
                              ₹{item.food.item_price}
                            </h5>

                            {/* Quantity Control */}
                            <div className="d-flex align-items-center mt-auto">

                              <button
                                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                                onClick={() => {
                                  updateQuantity(item.id, item.quantity + 1)
                                }}
                                style={{
                                  width: "35px",
                                  height: "35px"
                                }}
                              >
                                <i className="fa fa-plus"></i>
                              </button>

                              <span
                                className="fw-bold mx-3"
                                style={{ minWidth: "20px", textAlign: "center" }}
                              >
                                {item.quantity}
                              </span>

                              <button
                                className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                                onClick={() => {
                                  updateQuantity(item.id, item.quantity - 1)
                                }}
                                style={{
                                  width: "35px",
                                  height: "35px"
                                }}
                                disabled={item.quantity <= 1}
                              >
                                <i className="fa fa-minus"></i>
                              </button>

                              <button
                                className="btn btn-outline-danger  ms-3 d-flex align-items-center justify-content-center"
                                style={{
                                  height: "35px"
                                }}
                                onClick={() => { handleDelete(item.id) }}
                              >
                                <i className="fa fa-trash me-1"></i> Remove
                              </button>

                            </div>

                            {/* Item Total */}
                            <div className="mt-3 pt-2 border-top">
                              <span className="text-muted small">
                                Item Total
                              </span>

                              <h6 className="fw-bold mb-0">
                                ₹{item.food.item_price * item.quantity}
                              </h6>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </>)
              })}

              <div className="card text-end mt-5 p-2">
                <h4>Total : &#8377;{grandTotal}</h4>
                <button className='btn btn-primary ms-auto' onClick={()=>navigate('/payment')} style={{ width: '200px' }}><i className='bi bi-cart'></i> Proceed To Payment</button>
              </div>
            </div>
          </>
        )}
      </div>
    </PublicLayout>
  )
}

export default Cart
