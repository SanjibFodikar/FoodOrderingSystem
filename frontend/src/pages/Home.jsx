import PublicLayout from "../components/PublicLayout"
import '../styles/home.css'
import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWishlist } from '../context/WishlistContext';

const Home = () => {
  const [foods, setFoods] = useState([])
  const [wishlists, setwishlists] = useState([])
  const [ratings, setRatings] = useState({})
  const ratingRequests = useRef(new Set())
  let userId = localStorage.getItem('userId')
  const { WishlistCount, setWishlistCount } = useWishlist();
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/Foods_random/`)
      .then(a => a.json())
      .then(data => {
        setFoods(data)
      })
  }, [])

  const loadRatingSummary = async (foodId) => {
    if (ratings[foodId] || ratingRequests.current.has(foodId)) return

    ratingRequests.current.add(foodId)
    setRatings(previous => ({ ...previous, [foodId]: { loading: true } }))

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/food_rating_summary/${foodId}/`)
      if (!response.ok) throw new Error('Unable to load ratings')
      const summary = await response.json()
      setRatings(previous => ({ ...previous, [foodId]: { ...summary, loading: false } }))
    } catch {
      setRatings(previous => ({ ...previous, [foodId]: { error: true } }))
    } finally {
      ratingRequests.current.delete(foodId)
    }
  }

  useEffect(() => {
    if (userId) {
      fetch(`http://127.0.0.1:8000/api/wishlist/${userId}/`)
        .then(a => a.json())
        .then(data => {
          let wishlistId = data.map((item) => {
            return item.food_id
          })
          setwishlists(wishlistId)
        })
    }

  }, [userId])

  const toggleWishlist = async (food_id) => {
    if (!userId) {
      toast.info("please login to use wishlist")
      return
    }

    const is_wishlisted = wishlists.includes(food_id)
    console.log(is_wishlisted)
    console.log(food_id)

    if (is_wishlisted) {
      const response = await fetch(`http://127.0.0.1:8000/api/wishlist/remove/`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'userId': userId,
          'foodId': food_id
        })
      })
      const data = await response.json()
      if (response.status === 200) {
        toast.success(data.message)
        setwishlists(prev =>
          prev.filter(id => id !== food_id)
        );
        setWishlistCount(prev => Math.max(0, prev - 1));
      } else {
        toast.error(data.message)
      }
    } else {
      const response = await fetch(`http://127.0.0.1:8000/api/wishlist/add/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'userId': userId,
          'foodId': food_id
        })
      })
      const data = await response.json()
      if (response.status === 201) {
        toast.success(data.message)
        setwishlists(prev => [...prev, food_id]);
        setWishlistCount(prev => prev + 1);
      } else {
        toast.info(data.message)
      }
    }

  }

  return (
    <>
      <PublicLayout>
        <ToastContainer position="top-center" autoClose={1000} />
        <section className="hero" style={{ backgroundImage: "url('/images/home_final.png')" }}>
          <div className="title">
            <h1>Quick And Hot Food Delivered To You</h1>
            <p className="lead">Craving Something Tasty ? Let's get To Your Door .</p>
            <form action="/search-food" method="get" className="d-flex">
              <input type="text" className="form-control" name="search-food" id="" placeholder="I Would Like To Eat"
                style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }}
              />
              <button className="btn btn-success" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', width: '150px' }}>Search</button>
            </form>
          </div>
        </section>

        <section className="mt-4">
          <div className="container py-5">
            <h4 className="text-center text-primary mb-2">Most Loved Dishes This Month <span className="btn btn-danger ms-1">Top Picks</span></h4>
            <hr />
            <div className="row gy-3">
              {foods.length > 0 ? (
                foods.map((f) => {
                  return (<div className="col-12 col-sm-6 col-lg-4" key={f.id}>
                    <div
                      className="card card-food"
                      onMouseEnter={() => loadRatingSummary(f.id)}
                      onFocus={() => loadRatingSummary(f.id)}
                    >
                      <div className='position-relative'>
                        <img src={`http://127.0.0.1:8000${f.image}`} className='card-img-top' alt="image" style={{ height: "200px" }} />
                        <i className={`${wishlists.includes(f.id) ? 'fas' : 'far'} fa-heart position-absolute rounded shadow-lg top-0 end-0 m-2 text-danger`} style={{ cursor: 'pointer', fontSize: '20px', backgroundColor: 'white', padding: '5px' }}
                          onClick={() => toggleWishlist(f.id)}
                        ></i>
                      </div>

                      <div className="card-body">
                        <div className="card-title">
                          <Link to={'#'}>{f.item_name}</Link>
                        </div>
                        <p className="card-text text-muted">
                          {f.item_description.slice(0, 40) + "........"}
                        </p>
                        <div className='d-flex justify-content-between align-items-center'>
                          <span className='fw-bold'>₹ {f.item_price}</span>
                          {f.is_available ? (
                            <Link to={`/food/${f.id}`} className='btn btn-primary'><i className="fa-solid fa-cart-shopping me-1"></i>Order Now</Link>
                          ) : (
                            <div title='This food is not available , please try later'>
                              <button to={'#'} className='btn btn-outline-danger'><i className="fa-solid fa-circle-xmark me-1"></i>Currently Unavailable</button>
                            </div>

                          )}

                        </div>
                      </div>

                      <div className="food-rating-hover" aria-live="polite">
                        {!ratings[f.id] || ratings[f.id].loading ? (
                          <div className="food-rating-average">
                            <span>☆☆☆☆☆</span>
                            <span>Loading ratings...</span>
                          </div>
                        ) : ratings[f.id].error ? (
                          <div className="food-rating-average">
                            <span>☆☆☆☆☆</span>
                            <span>Ratings unavailable</span>
                          </div>
                        ) : (
                          <>
                            {/* Always visible rating */}
                            <div className="food-rating-average">
                              <span
                                aria-label={`${ratings[f.id].average_rating} out of 5 stars`}
                              >
                                {'★'.repeat(
                                  Math.round(ratings[f.id].average_rating || 0)
                                )}
                                {'☆'.repeat(
                                  5 - Math.round(ratings[f.id].average_rating || 0)
                                )}
                              </span>

                              <strong>
                                {Number(
                                  ratings[f.id].average_rating || 0
                                ).toFixed(2)} / 5
                              </strong>
                            </div>

                            {/* Extra details visible on hover */}
                            <div className="food-rating-details">
                              <div className="food-rating-count">
                                {ratings[f.id].total_reviews} reviews
                              </div>

                              <div className="food-rating-breakdown">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <span key={star}>
                                    {star} {star === 1 ? 'star' : 'stars'}:
                                    {' '}
                                    {ratings[f.id].rating_summary?.[star] || 0}
                                    {' '}ratings
                                  </span>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>

                    </div>
                  </div>
                  )
                })
              ) : (
                <div>
                  <h2 className='text-center text-danger'>No Items Found</h2>
                </div>
              )}
            </div>
          </div>
        </section>
      </PublicLayout>
    </>
  )
}

export default Home