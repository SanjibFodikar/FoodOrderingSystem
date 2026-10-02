import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Layout.css';

const PublicLayout = ({children}) => {
  return (
    <>
      <div className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link to='/' className='navbar-brand fw-bold'><i className="fa-solid fa-utensils me-1"></i> Food Ordering System</Link>
          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#navbtn"
            aria-controls="navbtn"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbtn">
            <ul className="navbar-nav ms-auto">

              <li className="nav-item">
                <Link className="nav-link text-white" to="/"><i className="fa-solid fa-home me-1"></i>Home</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="#"><i className="fa-solid fa-utensils me-1"></i>Menu</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="#"><i className="fa-solid fa-truck me-1"></i>Track</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to={'/register'}><i className="fa-solid fa-user-plus me-1"></i>Register</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="#"><i className="fa-solid fa-right-to-bracket me-1"></i>Login</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin-login"><i className="fa-solid fa-user-shield me-1"></i>Admin</Link>
              </li>

            </ul>
          </div>

        </div>
      </div>

      <div>
        {children}
      </div>


      <footer className="bg-dark text-white mt-5  text-white">
        <div className="container py-5">
          <div className="row">

            {/* Brand */}
            <div className="col-md-4 mb-4">
              <h4>
                <i className="fa-solid fa-utensils me-2"></i>
                Food Ordering System
              </h4>
              <p className="text-secondary">
                Delicious food, delivered with love.
                Order your favorite meals anytime, anywhere.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-2 mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-secondary text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary text-decoration-none">
                    Foods
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary text-decoration-none">
                    Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="text-secondary text-decoration-none">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-md-3 mb-4">
              <h5>Contact Us</h5>

              <p className="text-secondary mb-2">
                <i className="fa-solid fa-envelope me-2"></i>
                foodie@example.com
              </p>

              <p className="text-secondary mb-2">
                <i className="fa-solid fa-phone me-2"></i>
                +91 98765 43210
              </p>

              <p className="text-secondary">
                <i className="fa-solid fa-location-dot me-2"></i>
                Kolkata, India
              </p>
            </div>

            {/* Social Media */}
            <div className="col-md-3 mb-4">
              <h5>Follow Us</h5>

              <div className="d-flex gap-3">
                <a href="#" className="text-white fs-5">
                  <i className="fa-brands fa-facebook"></i>
                </a>

                <a href="#" className="text-white fs-5">
                  <i className="fa-brands fa-instagram"></i>
                </a>

                <a href="#" className="text-white fs-5">
                  <i className="fa-brands fa-twitter"></i>
                </a>

                <a href="#" className="text-white fs-5">
                  <i className="fa-brands fa-youtube"></i>
                </a>
              </div>
            </div>

          </div>

          <hr className="border-secondary" />

          {/* Copyright */}
          <div className="text-center text-secondary">
            <small>
              © 2026 Foodie. All Rights Reserved.
            </small>
          </div>

        </div>
      </footer>
    </>
  )
}

export default PublicLayout
