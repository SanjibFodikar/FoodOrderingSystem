import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ToastContainer,toast } from 'react-toastify';

const FoodDetails = () => {
  const navigate = useNavigate()
  const [food, setFood] = useState(null)
  const userId = localStorage.getItem('userId')
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/food_detail/${id}`)
      .then(a => a.json())
      .then(data => {
        setFood(data)
      })

  }, [])

  const handleAddToCart = async () => {
    if (!userId) {
      navigate('/user-login')
    }

    try {
      let response = await fetch(`http://127.0.0.1:8000/api/cart_add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'userId': userId,
          'foodId': food.id
        })
      })
      let data = await response.json()
      if (response.status === 200) {
        toast.success(data.message)
        navigate('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }

  }

  if (!food) return <div>Loading Food ......</div>
  return (
    <PublicLayout>
      <ToastContainer/>
      <div className="container py-5" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="row g-0">

                {/* ================= IMAGE ================= */}
                <div className="col-12 col-md-5 bg-light d-flex align-items-center justify-content-center p-4">
                  <Zoom>
                    <img
                      src={`http://127.0.0.1:8000${food.image}`}
                      className="img-fluid rounded-4"
                      alt={food.item_name}
                      style={{
                        maxHeight: "350px",
                        width: "100%",
                        objectFit: "cover"
                      }}
                    />
                  </Zoom>
                </div>

                {/* ================= DETAILS ================= */}
                <div className="col-12 col-md-7">
                  <div className="card-body p-4 p-lg-5">

                    {/* Category */}
                    <span className="badge bg-warning text-dark rounded-pill px-3 py-2 mb-3">
                      {food.category_name}
                    </span>

                    {/* Food Name */}
                    <h2 className="fw-bold mb-3">
                      {food.item_name}
                    </h2>

                    {/* Description */}
                    <p className="text-muted lh-lg mb-4">
                      {food.item_description}
                    </p>

                    {/* Category */}
                    <div className="mb-3">
                      <span className="text-muted">
                        Category:
                      </span>{" "}
                      <strong>{food.category_name}</strong>
                    </div>

                    {/* Price */}
                    <h2 className="fw-bold text-success mb-4">
                      ₹ {food.item_price}
                    </h2>

                    {/* Availability */}
                    {food.is_available ? (
                      <button
                        onClick={handleAddToCart}
                        className="btn btn-warning btn-lg px-4 rounded-pill fw-semibold shadow-sm"
                      >
                        <i className="fa-solid fa-cart-shopping me-2"></i>
                        Add To Cart
                      </button>
                    ) : (
                      <div title="This food is not available, please try later">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-lg px-4 rounded-pill"
                          disabled
                        >
                          <i className="fa-solid fa-circle-xmark me-2"></i>
                          Currently Unavailable
                        </button>
                      </div>
                    )}

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </PublicLayout>
  )
}

export default FoodDetails
