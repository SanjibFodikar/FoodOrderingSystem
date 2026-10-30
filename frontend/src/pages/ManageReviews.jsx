import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout';
import { toast, ToastContainer } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import { data, Link } from 'react-router-dom';
import '../styles/manage_reviews.css';

const ManageReviews = () => {
    const [reviews, setReviews] = useState([])
    const navigate = useNavigate()


    useEffect(() => {
        const username = localStorage.getItem('admin_userId')
        if (!username) {
            navigate('/admin-login')
        }
        fetchReviews()
    }, [])

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/all_reviews/`)
            const data = await response.json()
            setReviews(data)
        } catch (error) {
            console.error('Error fetching reviews:', error)
        }
    }

    const deleteReview = async (reviewId) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/delete_review/${reviewId}/`, {
                    method: 'DELETE',
                })
                if (response.ok) {
                    toast.success('Review deleted successfully')
                    fetchReviews()
                } else {
                    toast.error('Failed to delete review')
                }
            } catch (error) {
                console.error('Error deleting review:', error)
                toast.error('An error occurred while deleting the review')
            }
        }
    }

    return (
        <AdminLayout>
            <ToastContainer />
            <div className="container">
                <h3 className='text-center text-primary'><i className="bi bi-list-check me-2"></i>Detail of All Reviews</h3>
                <h5 className='text-end'><i className="bi bi-database me-1"></i> All Reviews
                    <span className='ms-2 badge bg-success'>{reviews.length}</span>
                </h5>

                <div className='reviews-table-wrap'>
                <table className='table table-striped table-hover align-middle reviews-table'>
                    <thead className='table-dark'>
                         <tr>
                            <th>S.no</th>
                            <th>Food Item</th>
                            <th>User Name</th>
                            <th>User Rating</th>
                            <th>Comment</th>
                            <th>Review Date</th>
                            <th>Action</th>
                         </tr>
                    </thead>
                    <tbody>
                        {reviews.length == 0 ?(
                            <tr>
                                <td colSpan={7} className='text-center reviews-empty'><strong>No Data Found</strong></td>
                            </tr> 

                        ) :(
                            reviews.map((review,index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{review.food_name}</td>
                                        <td>{review.user_name}</td>
                                        <td>{[...Array(5)].map((_,i)=>{
                                            return <i key={i} className={`fa-star text-warning ${i < review.rating ? 'fas' : 'far'}`}></i>
                                        })}</td>
                                        <td>{review.comment}</td>
                                        <td>{new Date (review.created_at).toLocaleString()}</td>
                                        <td><button onClick={() => deleteReview(review.id)} className='btn btn-danger'><i className='bi bi-trash me-1'></i>Delete</button></td>
                                    </tr>
                                )
                            })
                           
                        )}
                    </tbody>
                </table>
                </div>

            </div>
        </AdminLayout>
    )
}

export default ManageReviews
