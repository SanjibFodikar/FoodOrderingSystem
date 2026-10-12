import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Layout.css';

const PublicLayout = ({ children }) => {
  const navigate = useNavigate()
  const [isLoggedin, setIsLogedIn] = useState(false)
  const [userName, setUserName] = useState("")

  let userId = localStorage.getItem('userId')
  let name = localStorage.getItem('username')

  const handleLogout = () => {
    localStorage.removeItem('userId')
    setIsLogedIn(false)
    navigate('/user-login')
  }

  useEffect(() => {
    if (userId) {
      setIsLogedIn(true)
      setUserName(name)
    }
  }, [userId])

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

              {isLoggedin ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/my-orders"><i class="bi bi-bag-check me-1"></i>My Order</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/cart"><i className="bi bi-cart me-1"></i>Cart</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/admin-login"><i className="bi bi-heart-fill text-danger me-1"></i>Wishlist</Link>
                  </li>


                  <div class="btn-group">
                    <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                      <i class="bi bi-person-circle me-1"></i>{userName}
                    </button>
                    <ul class="dropdown-menu">
                      <li><Link to={'/profile'} class="dropdown-item" href="#"><i class="bi bi-person-fill me-1"></i>Profile</Link></li>
                      <li><Link class="dropdown-item" to={'/change-password'}><i class="bi bi-key me-1"></i>Change Password</Link></li>
                      <li><hr class="dropdown-divider" /></li>
                      <li><button class="dropdown-item" onClick={handleLogout} href="#"><i class="bi bi-box-arrow-right me-1"></i>Logged out</button></li>
                    </ul>
                  </div>

                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white" to={'/register'}><i className="fa-solid fa-user-plus me-1"></i>Register</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/user-login"><i className="fa-solid fa-right-to-bracket me-1"></i>Login</Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link text-white" to="/admin-login"><i className="fa-solid fa-user-shield me-1"></i>Admin</Link>
                  </li>
                </>
              )}

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
