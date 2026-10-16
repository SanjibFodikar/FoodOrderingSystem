import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CSVLink } from 'react-csv'

const ManageUser = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState([])
    const [backup, setBackup] = useState([])

    useEffect(() => {
        const username = localStorage.getItem('admin_userId')

        if (!username) {
            navigate('/admin-login')
            return
        }

        getUser()
    }, [navigate])

    const getUser = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/get_users/')

            const data = await response.json()
            setUser(data)
            setBackup(data)

        } catch (error) {
            console.error(error)
            toast.error('Unable to load food items')
        }
    }

    const handleSearch = (s) => {
        const val = s.trim().toLowerCase()

        if (!val) {
            setUser(backup)
            return
        }

        const filteredData = backup.filter((user) =>
            user.full_name?.toLowerCase().includes(val) ||
            user.email?.toLowerCase().includes(val) ||
            user.mobile?.toLowerCase().includes(val)
        )

        setUser(filteredData)
    }

    const handleDelete = async (id) => {
        const confirmation = window.confirm("Are you sure to delete User")
        if (confirmation) {
            let response = await fetch(`http://127.0.0.1:8000/api/delete_user/${id}/`, {
                method: 'DELETE'
            })
            let data = await response.json()
            if (response.status === 200) {
                toast.success("User deleted successfully")
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

                    <h3 className="text-primary mb-0 text-center">
                        <i className="bi bi-list-check me-2"></i>
                        Users List
                    </h3>

                    <h6 className="mb-0 text-secondary">
                        Total Food:
                        <span className="badge bg-success ms-2">
                            {user.length}
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
                                placeholder="Search user by name ..."
                                onChange={(e) =>
                                    handleSearch(e.target.value)
                                }
                                aria-label="Search food"
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-5 col-lg-4">
                        <CSVLink
                            data={user}
                            filename="user_list.csv"
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

                                <thead className="table-dark text-center">
                                    <tr>
                                        <th className="px-3">S.No</th>
                                        <th>Full Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody className='text-center'>
                                    {user.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="text-center py-5 text-muted"
                                            >
                                                <i className="bi bi-people fs-2 d-block mb-2"></i>
                                                No Users Found
                                            </td>
                                        </tr>
                                    ) : (
                                        user.map((u, index) => (
                                            <tr key={u.id}>
                                                <td className="px-3">
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    <span className="badge bg-light text-dark border">
                                                        {u.full_name}
                                                    </span>
                                                </td>

                                                <td className="fw-semibold">
                                                    {u.email}
                                                </td>

                                                <td>{u.mobile}</td>

                                                <td>
                                                    <div className="d-flex gap-2 justify-content-center">

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-outline-danger"
                                                            title="Delete food"
                                                            onClick={() => handleDelete(u.id)}
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

export default ManageUser
