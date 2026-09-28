import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({toogleSidebar,openSidebar}) => {
  const navigate=useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('admin_userId')
    navigate('/admin-login')
  }
  return (
    <nav className='navbar navbar-expand-lg bg-white navbar-light border-bottom '>
      <button className="btn btn-dark ms-1" onClick={toogleSidebar}><i className={`bi ${openSidebar  ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i></button>
      <div className="container">
        
        <span className='navbar-brand fw-semibold'><i className="bi bi-egg-fried me-2"></i>Food Ordering System</span>
        <button className='navbar-toggler'><i className="bi bi-list"></i></button>

        <div className='collapse navbar-collapse'>
            <ul className='navbar-nav ms-auto align-items-center gap-2'>
              <li className='nav-item'><button className='btn btn-outline-success'><i className="bi bi-bell"></i></button></li>
              <li><button className='btn btn-outline-danger' onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
            </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader
