import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {

  useEffect(() => {
    const username = localStorage.getItem('admin_userId')
    if (!username) {
      navigate('/admin-login')
    }
  }, [])

  const [category, setCategory] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch('http://127.0.0.1:8000/api/add_category/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category)
      })
      let data = await response.json()
      if (response.status === 201) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <AdminLayout>
      {/* <div className="container"> */}
      <div className="row">
        <div className="col-12 col-md-12 col-lg-8">
          <div className="shadow p-4  rounded">
            <h4><i className="bi bi-plus-circle-fill me-2 mb-4 text-primary text-center"></i>Add Category</h4>

            <ToastContainer position="top-center" />
            <div className="card ">
              <div className="card p-2 shadow-lg">
                <div >
                  <div className="card-body">
                    <form action="" onSubmit={handleSubmit} className="was-validated">

                      <div className="mb-3 mt-3">
                        <label htmlFor="category" className="form-label fw-bold">
                          Category Name:
                        </label>

                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bi bi-grid"></i>
                          </span>

                          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} name="category" className="form-control" id="category" placeholder="Enter Categoty Name" required />
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary me-auto">
                        <i className="bi bi-plus-circle-fill me-2"></i> Add Category
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
      {/* </div> */}
    </AdminLayout>
  )
}

export default AddCategory
