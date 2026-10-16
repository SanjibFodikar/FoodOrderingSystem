import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CSVLink } from 'react-csv'

const ManageFood = () => {
    const navigate = useNavigate()

    const [setFood, setAllFood] = useState([])
    const [backup, setBackup] = useState([])

    useEffect(() => {
        const username = localStorage.getItem('admin_userId')

        if (!username) {
            navigate('/admin-login')
            return
        }

        receiveCategory()
    }, [navigate])

    const receiveCategory = async () => {
        try {
            const response = await fetch(
                'http://127.0.0.1:8000/api/Foods_list/'
            )

            if (!response.ok) {
                throw new Error('Failed to load food items')
            }

            const data = await response.json()
            setAllFood(data)
            setBackup(data)

        } catch (error) {
            console.error(error)
            toast.error('Unable to load food items')
        }
    }

    const handleSearch = (s) => {
        const val = s.trim().toLowerCase()

        if (!val) {
            setAllFood(backup)
            return
        }

        const filteredData = backup.filter((food) =>
            food.category_name?.toLowerCase().includes(val) ||
            food.item_name?.toLowerCase().includes(val)
        )

        setAllFood(filteredData)
    }

    const handleDelete = async (id) => {
        const confirmation = window.confirm("Are you sure to delete Food")
        if (confirmation) {
            let response = await fetch(`http://127.0.0.1:8000/api/delete_food/${id}/`, {
                method: 'DELETE'
            })
            let data = await response.json()
            if (response.status === 200) {
                toast.success("Food deleted successfully")
                setTimeout(() => {
                    window.location.reload();
                }, 500)
            } else {
                toast.error("something went wrong")
            }
        }
    }

    return (
        <AdminLayout>
            <div className="container-fluid px-3 px-md-4 py-4">

                {/* Heading */}
                <div className="d-flex flex-column flex-sm-row
                    justify-content-between align-items-sm-center gap-2 mb-4">

                    <h3 className="text-primary mb-0">
                        <i className="bi bi-list-check me-2"></i>
                        Manage Food Items
                    </h3>

                    <h6 className="mb-0 text-secondary">
                        Total Food:
                        <span className="badge bg-success ms-2">
                            {setFood.length}
                        </span>
                    </h6>
                </div>

                {/* Search and CSV */}
                <div className="row g-3 align-items-center mb-4">
                    <div className="col-12 col-md-7 col-lg-8">
                        <div className="input-group shadow-sm">
                            <span className="input-group-text bg-white">
                                <i className="bi bi-search text-success"></i>
                            </span>

                            <input
                                type="search"
                                className="form-control"
                                placeholder="Search by category or food name..."
                                onChange={(e) =>
                                    handleSearch(e.target.value)
                                }
                                aria-label="Search food"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-5 col-lg-4">
                        <CSVLink
                            data={setFood}
                            filename="food_list.csv"
                            className="btn btn-success w-100 shadow-sm"
                        >
                            <i className="bi bi-filetype-csv me-2"></i>
                            Export To CSV
                        </CSVLink>
                    </div>
                </div>

                {/* Responsive Table */}
                <div className="card border-0 shadow-sm">
                    <div className="card-body p-0">
                        <div className="table-responsive">
                            <table className="table table-striped
                                table-hover align-middle mb-0">

                                <thead className="table-dark">
                                    <tr>
                                        <th className="px-3">S.No</th>
                                        <th>Category</th>
                                        <th>Food Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th className="text-center px-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {setFood.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="text-center py-5 text-muted"
                                            >
                                                <i className="bi bi-inbox fs-2 d-block mb-2"></i>
                                                No Food Records Found
                                            </td>
                                        </tr>
                                    ) : (
                                        setFood.map((food, index) => (
                                            <tr key={food.id}>
                                                <td className="px-3">
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    <span className="badge bg-light text-dark border">
                                                        {food.category_name}
                                                    </span>
                                                </td>

                                                <td className="fw-semibold">
                                                    {food.item_name}
                                                </td>

                                                <td>{food.item_quantity}</td>

                                                <td className="text-success fw-semibold text-nowrap">
                                                    ₹{food.item_price}
                                                </td>

                                                <td>
                                                    {food.image && (
                                                        <img
                                                            src={`http://127.0.0.1:8000${food.image}`}
                                                            alt={food.item_name}
                                                            className="rounded border"
                                                            style={{
                                                                width: '55px',
                                                                height: '55px',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                    )}
                                                </td>

                                                <td>
                                                    <div className="d-flex gap-2 justify-content-center">
                                                        <Link
                                                            to={`/admin-edit-food/${food.id}`}
                                                            className="btn btn-sm btn-outline-success"
                                                            title="Edit food"
                                                        >

                                                            <i className="bi bi-pencil-square me-1"></i>
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            title="Delete food"
                                                            onClick={() => handleDelete(food.id)}
                                                        >
                                                            <i className="bi bi-trash me-1"></i>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    )
}

export default ManageFood
