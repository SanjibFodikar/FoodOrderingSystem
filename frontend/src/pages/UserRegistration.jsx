import React from 'react'
import PublicLayout from '../components/PublicLayout'

const UserRegistration = () => {
    return (
        <PublicLayout>
            <div className="container mt-3 py-5">
                <div className="row align-items-center justify-content-center g-4">

                    {/* Registration Image */}
                    <div className="col-12 col-lg-7 text-center">
                        <img
                            src="/images/register.png"
                            alt="Food registration"
                            className="img-fluid"
                            style={{ maxHeight: "550px", objectFit: "contain" }}
                        />
                    </div>

                    {/* Registration Form */}
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5">

                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                            {/* Header */}
                            <div className="bg-dark text-white text-center p-4">
                                <i className="fa-solid fa-user-plus fs-1 mb-2"></i>

                                <h3 className="fw-bold mb-1">
                                    Create Account
                                </h3>

                                <p className="mb-0 text-white-50">
                                    Join us and enjoy delicious food
                                </p>
                            </div>

                            {/* Form */}
                            <div className="card-body p-4 p-md-5">

                                <form>

                                    {/* Name */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Full Name
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <i className="fa-solid fa-user"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Email Address
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <i className="fa-solid fa-envelope"></i>
                                            </span>

                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Mobile */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Mobile Number
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <i className="fa-solid fa-phone"></i>
                                            </span>

                                            <input
                                                type="tel"
                                                className="form-control"
                                                placeholder="Enter your mobile number"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Password
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <i className="fa-solid fa-lock"></i>
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Create a password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Confirm Password
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <i className="fa-solid fa-lock"></i>
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Confirm your password"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="btn btn-dark w-100 py-2 fw-semibold"
                                    >
                                        <i className="fa-solid fa-user-plus me-2"></i>
                                        Create Account
                                    </button>

                                </form>

                                <div className="text-center mt-4">
                                    <small className="text-muted">
                                        Already have an account?
                                        <a
                                            href="#"
                                            className="text-decoration-none fw-semibold ms-1"
                                        >
                                            Login
                                        </a>
                                    </small>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    )
}

export default UserRegistration
