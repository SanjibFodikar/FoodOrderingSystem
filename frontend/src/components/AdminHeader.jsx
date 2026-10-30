import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = ({toogleSidebar,openSidebar,newOrder}) => {
  const navigate=useNavigate()
  const handleLogout = () =>{
    localStorage.removeItem('admin_userId')
    navigate('/admin-login')
  }
  return (
    <nav className='navbar bg-white navbar-light border-bottom pt-2'>
      <button className="btn btn-dark ms-1" onClick={toogleSidebar}><i className={`bi ${openSidebar  ? 'bi-chevron-left' : 'bi-chevron-right'}`}></i></button>
      <div className="container">
        
        <span className='navbar-brand fw-semibold'><i className="bi bi-egg-fried me-2"></i>Food Ordering System</span>
        <div className='d-flex ms-auto'>
            <ul className='navbar-nav ms-auto align-items-center gap-2'>
              <li className='nav-item position-relative'>
                <button className='btn btn-outline-success position-relative' onClick={()=>{
                  if (newOrder>0) {
                    navigate('/order-not-confirmed')
                  }
                }}
                title={newOrder>0 ? 'View new orders' : 'No New Order'}
                >
                
                  <i className="bi bi-bell"></i>
                  <span className='badge bg-danger position-absolute top-0 start-0 translate-middle'>{newOrder | 0}</span>
                </button>
              </li>

              <li><button className='btn btn-outline-danger' onClick={handleLogout}><i className="bi bi-box-arrow-right me-2"></i>Logout</button></li>
            </ul>
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader
