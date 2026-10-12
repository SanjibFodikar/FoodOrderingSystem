import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout';
import { useParams, useNavigate, Link, useActionData } from 'react-router-dom';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        mobile: '',
        password: '',
        reg_date: ''
    })
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (!userId) {
            navigate('/user-login')
        }

        fetch(`http://127.0.0.1:8000/api/userDetails/${userId}`)
            .then(a => a.json())
            .then(data => {
                setFormData(data)
            })

    }, [userId])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        let response=await fetch(`http://127.0.0.1:8000/api/user_update/${userId}/`,{
            method:'PUT',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
                full_name:formData.full_name,
                email:formData.email,
                mobile:formData.mobile
            })
        })
        let data=await response.json()
        if (response.status === 200) {
            toast.success(data.message)
        }else{
            toast.error(data.message)
        }
    }
    return (
        <div>
            <PublicLayout>
                <ToastContainer />
                <div className="container" style={{ marginTop: '100px' }}>
                    <h4 className='text-center'><i className='bi bi-person-fill me-1 '></i>User Profile</h4>
                    <div className="row mt-2">

                        <div className="col-12 col-md-6 mx-auto">
                            <div className="card shadow-sm">
                                <div className="card-header bg-white py-3">
                                    <h5 className="mb-0">
                                        <i className="bi bi-person-circle me-2"></i>
                                        Personal Information
                                    </h5>
                                </div>

                                <div className="card-body p-4">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                name="full_name"
                                                className="form-control"
                                                placeholder="Enter your full name"
                                                value={formData.full_name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        full_name: e.target.value
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                value={formData.email}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        email: e.target.value
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label">
                                                Mobile Number
                                            </label>
                                            <input
                                                type="tel"
                                                name="mobile"
                                                className="form-control"
                                                placeholder="Enter your mobile number"
                                                value={formData.mobile}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        mobile: e.target.value
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className="form-label">
                                                Registration Date
                                            </label>
                                            <input
                                                type="text"
                                                name="reg_date"
                                                className="form-control"
                                                value={new Date(formData.reg_date).toLocaleDateString()}
                                                readOnly
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-dark w-100"
                                        >
                                            <i className="bi bi-pencil-square me-2"></i>
                                            Update Profile
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </PublicLayout>
        </div>
    )
}

export default Profile
