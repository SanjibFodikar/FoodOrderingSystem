import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';

const FoodDetails = () => {
  const navigate = useNavigate()
  const [food, setFood] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [Hoverrating, setHoverRating] = useState(0)
  const [editId, setEditId] = useState(null)
  const userId = localStorage.getItem('userId')
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/food_detail/${id}`)
      .then(a => a.json())
      .then(data => {
        setFood(data)
      })

    fetch(`http://127.0.0.1:8000/api/reviews/${id}`)
      .then(a => a.json())
      .then(data => {
        setReviews(data)
        console.log(data)
      })

  }, [id])

  const handleReviewSubmit = async () => {
    if (!userId) {
      toast.warning('Please login first to give review')
      navigate('/user-login')
    }

    if (rating < 1 || rating > 5) {
      toast.error('Please Select a rating from 1 to 5')
      return
    }

    const payLoad = {
      userId: userId,
      food_id: id,
      rating,
      comment
    }

    const url = editId ? `http://127.0.0.1:8000/api/review/update/${editId}/` : `http://127.0.0.1:8000/api/review/add/${id}/`
    const method = editId ? 'PUT' : 'POST'

    try {
      let response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payLoad)
      })
      let data = await response.json()
      if (response.ok) {
        toast.success(editId ? 'Review Updated Successfully' : 'Review Added Successfully')
        setComment('')
        setRating(0)
        setEditId(null)

        const updatedReviews = await fetch(`http://127.0.0.1:8000/api/reviews/${id}/`)
        const result = await updatedReviews.json()
        setReviews(result)

        // navigate('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
    }

  }

  const fetchReviews = async () => {
    const res = await fetch(`http://127.0.0.1:8000/api/reviews/${id}/`)
    const result = await res.json()
    setReviews(result)
  }

  const handleDeleteReview = async (id) => {
    const confirmDelete = window.confirm('Are you sure to delete this review')
    if (confirmDelete) {
      const res = await fetch(`http://127.0.0.1:8000/api/review/delete/${id}/`, {
        method: 'DELETE'
      })
      if (res.ok) {
        toast.success("Review Deleted")
        fetchReviews()
      } else {
        toast.error("Failed To Delete")
      }
    }
  }

  const renderStar = (count, clickable = false) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i key={i}
          className={`fa-star ${i <= (Hoverrating || count) ? 'fas text-warning' : 'far text-secondary'}`}
          style={{ cursor: clickable ? 'pointer' : 'default', fontSize: '20px', marginRight: '4px' }}
          onClick={clickable ? () => setRating(i) : undefined}
          onMouseEnter={clickable ? () => setHoverRating(i) : undefined}
          onMouseLeave={clickable ? () => setHoverRating(0) : undefined}
        ></i>
      )
    }
    return stars
  }

  const handleEditReview = async (rev) => {
    setRating(rev.rating)
    setComment(rev.comment)
    setEditId(rev.id)
  }

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
      <ToastContainer />
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

        <hr />

        <div className="mt-5">
          <h4>Customer Reviews</h4>
          {reviews.length === 0 ? (
            <p className='text-muted fas-italic'>No Reviews Yet . Be The First To Share Your Thoughts</p>
          ) : reviews.map((rev) => {
            return <div key={rev.id} className='mb-2 p-3 border-bottom'>
              <div className="d-flex justify-content-between">
                <div>
                  <strong>{rev.user_name}</strong> <span>{renderStar(rev.rating)}</span>
                </div>
                 <div>
                {rev.user === parseInt(userId) && (<>
                  <i className='fas fa-edit text-primary me-2' style={{ cursor: 'pointer', fontSize: '20px' }} title='Edit'
                    onClick={() => handleEditReview(rev)}
                  ></i>
                  <i className='fas fa-trash-alt text-danger me-2' style={{ cursor: 'pointer', fontSize: '20px' }} title='Delete'
                    onClick={() => handleDeleteReview(rev.id)}
                  ></i>
                </>)}
                </div>
              </div>
              <div>
                <p className='text-muted'>{rev.comment}</p>
                <p className='text-muted'>{new Date(rev.created_at).toLocaleDateString()}</p>
              </div>

            </div>
          })}
        </div>

        <div className="mt-5">
          <h5 className='text-primary'><i className='fas fa-pen me-2'></i>Your Rating</h5>

          <div className="mb-3">
            <label htmlFor="" className='form-label'>Your Rating</label>
            <div>{renderStar(rating, true)}</div>
          </div>

          <div className="mb-3">
            <textarea name="" id="" className='form-control' placeholder='Write a review' rows={3}
              value={comment} onChange={(e) => setComment(e.target.value)}
            ></textarea>

            <button className='btn btn-success mt-2'
              onClick={handleReviewSubmit}
            >
              <i className='fas fa-paper-plane me-2'></i> Submit Review
            </button>
          </div>

        </div>
      </div>

    </PublicLayout>
  )
}

export default FoodDetails
