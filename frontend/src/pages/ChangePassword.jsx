import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {
  const navigate = useNavigate
  const [formData, setFormData] = useState({
    email_password: '',
    new_password: '',
    confirm_password: ''
  })

  const [showpassword, setShowPassword] = useState(false)
  const [showConfirmpassword, setShowConfirmPassword] = useState(false)

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (!userId) {
      navigate('/user-login')
    }
  }, [userId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.confirm_password !== formData.new_password) {
      toast.error("New password and confirm password do not match")
      return
    }

    let response = await fetch('http://127.0.0.1:8000/api/change_password/', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email_password: formData.email_password,
        new_password: formData.new_password,
        userId:userId
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
    <PublicLayout>
      <ToastContainer />

      <div
        className="container d-flex justify-content-center align-items-center"
        style={{
          minHeight: "85vh",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        <div
          className="card border-0 shadow-lg rounded-4 w-100"
          style={{ maxWidth: "520px" }}
        >
          <div
            className="card-body p-4 p-md-5"
            style={{ backgroundColor: "#ffffff", borderRadius: "16px" }}
          >
            {/* Header */}
            <div className="text-center mb-4">
              <div
                className="d-inline-flex justify-content-center align-items-center rounded-circle mb-3"
                style={{
                  width: "75px",
                  height: "75px",
                  background: "#eaf2ff",
                  color: "#0d6efd",
                }}
              >
                <i className="bi bi-shield-lock-fill fs-1"></i>
              </div>

              <h3 className="fw-bold mb-2">Change Password</h3>
              <p className="text-secondary mb-0">
                Keep your account secure by updating your password.
              </p>
            </div>


            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email or Current Password
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-person-lock text-primary"></i>
                  </span>

                  <input
                    type="text"
                    name="email_password"
                    className="form-control bg-light border-start-0 py-2"
                    placeholder="Enter email or current password"
                    value={formData.email_password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value
                      })
                    }
                    required
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  New Password
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-key-fill text-primary"></i>
                  </span>

                  <input
                    type={showpassword ? "text" : "password"}
                    name="new_password"
                    className="form-control bg-light border-start-0 border-end-0 py-2"
                    placeholder="Enter new password"
                    minLength={6}
                    value={formData.new_password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value
                      })
                    }
                    required
                  />

                  <button
                    type="button"
                    className="input-group-text bg-light border-start-0"
                    onClick={(e) => setShowPassword(!showpassword)}
                  >
                    <i className={`bi ${showpassword ? "bi-eye-slash" : 'bi-eye'}`}></i>
                  </button>
                </div>

                <small className="text-secondary">
                  Password must contain at least 6 characters.
                </small>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Confirm Password
                </label>

                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <i className="bi bi-check-circle-fill text-primary"></i>
                  </span>

                  <input
                    type={showConfirmpassword ? "text" : "password"}
                    name="confirm_password"
                    className="form-control bg-light border-start-0 border-end-0 py-2"
                    placeholder="Confirm your new password"
                    minLength={6}
                    value={formData.confirm_password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value
                      })
                    }
                    required
                  />

                  <button
                    type="button"
                    className="input-group-text bg-light border-start-0"
                    onClick={(e) => setShowConfirmPassword(!showConfirmpassword)}
                  >
                    <i className={`bi ${showConfirmpassword ? "bi-eye-slash" : 'bi-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 py-2 fw-semibold rounded-3 shadow-sm"
              >
                <i className="bi bi-shield-check me-2"></i>
                Change Password
              </button>

              <div className="text-center mt-4">
                <small className="text-secondary">
                  <i className="bi bi-shield-check text-success me-1"></i>
                  Your account security matters to us.
                </small>
              </div>
            </form>

          </div>
        </div>
      </div>

    </PublicLayout>
  )
}

export default ChangePassword
