import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { data, Link, useNavigate, useParams } from 'react-router-dom';
import { CSVLink } from 'react-csv'
import { toast, ToastContainer } from 'react-toastify';


const EditCategory = () => {
    const navigate = useNavigate()
    const [category, setCategory] = useState({
        'category_name': ''
    })
    const { id } = useParams()
    useEffect(() => {
        const username = localStorage.getItem('admin_userId')
        if (!username) {
            navigate('/admin-login')
        }

        fetch(`http://127.0.0.1:8000/api/edit_category/${id}/`)
            .then(a => a.json())
            .then(data => {
                setCategory(data)
            })

    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/edit_category/${id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category)
            })
            const data = await response.json()
            if (response.status === 200) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error('Unable to load food items')
        }
    }

    return (
        <AdminLayout>
            <ToastContainer />
            <div className="row">
                <div className="col-12 col-md-12 col-lg-8">
                    <div className="shadow p-4  rounded">
                        <h4><i className="bi bi-pencil-square me-2 mb-4 text-primary text-center"></i>Edit Category</h4>

                        <ToastContainer position="top-center" />
                        <div className="card ">
                            <div className="card p-2 shadow-lg">
                                <div >
                                    <div className="card-body">
                                        <form onSubmit={handleSubmit} className="was-validated">

                                            <div className="mb-3 mt-3">
                                                <label htmlFor="category" className="form-label fw-bold">
                                                    Category Name:
                                                </label>

                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-grid"></i>
                                                    </span>

                                                    <input type="text" value={category.category_name} onChange={(e) => setCategory({ ...category, category_name: e.target.value })} name="category" className="form-control" id="category" placeholder="Enter Categoty Name" required />
                                                </div>
                                            </div>

                                            <button type="submit" className="btn btn-primary me-auto">
                                                <i className="bi bi-plus-circle-fill me-2"></i>Update Category
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 text-secondary text-center">
                    <i className="bi bi-cup-straw" style={{ fontSize: '200px' }}></i>
                    <i className="bi bi-fork-knife" style={{ fontSize: '200px' }}></i>
                </div>
            </div>
        </AdminLayout>
    )
}

export default EditCategory
