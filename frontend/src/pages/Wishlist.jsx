import PublicLayout from "../components/PublicLayout"
import '../styles/home.css'
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useWishlist } from '../context/WishlistContext';

const Wishlist = () => {
    const [wishlists, setwishlists] = useState([])
    let userId = localStorage.getItem('userId')
    const { WishlistCount, setWishlistCount } = useWishlist();

    useEffect(() => {
        if (userId) {
            fetchWishlist()
        }
    }, [userId])

    const fetchWishlist = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/wishlist/${userId}/`)
        const data = await response.json()
        setwishlists(data)
        setWishlistCount(data.length);
    }

    const removeWishlist = async (food_id) => {
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
            fetchWishlist()
            
        } else {
            toast.error(data.message)
        }
    }

    return (
        <PublicLayout>
            <div className="container py-5" style={{ marginTop: '60px' }}>
                <h4 className="text-center text-primary mb-2">My Wishlist</h4>
                <hr />
                <div className="row gy-3">
                    {wishlists.length > 0 ? (
                        wishlists.map((f) => {
                            return (<div className="col-12 col-sm-6 col-lg-4" key={f.id}>
                                <div className="card card-food" >
                                    <div className='position-relative'>
                                        <img src={`http://127.0.0.1:8000${f.image}`} className='card-img-top' alt="image" style={{ height: "200px" }} />
                                        <i className={`fas fa-heart position-absolute rounded shadow-lg top-0 end-0 m-2 text-danger`} style={{ cursor: 'pointer', fontSize: '20px', backgroundColor: 'white', padding: '5px' }}
                                            onClick={() => removeWishlist(f.food_id)}
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
                                                <Link to={`/food/${f.food_id}`} className='btn btn-primary'><i className="fa-solid fa-cart-shopping me-1"></i>Order Now</Link>
                                            ) : (
                                                <div title='This food is not available , please try later'>
                                                    <button to={'#'} className='btn btn-outline-danger'><i className="fa-solid fa-circle-xmark me-1"></i>Currently Unavailable</button>
                                                </div>

                                            )}

                                        </div>
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
        </PublicLayout>
    )
}

export default Wishlist
