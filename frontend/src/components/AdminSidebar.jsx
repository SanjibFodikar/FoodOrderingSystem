import React, { useState } from 'react'
import { Link } from 'react-router-dom';


const AdminSidebar = () => {
  const [collapse, setCollapse] = useState({
    'category': false,
    'item': false,
    'order': false
  })

  const handleCollapse = (menu) => {

    setCollapse((prev) => (
      {
        ...prev,
        [menu]: !prev[menu]
      }
    ))
    console.log(menu)
  }

  return (
    <div className='bg-dark text-white sidebar'>
      <div className="text-center p-3 border-bottom mb-2">
        <img src="images/cartoon-admin.jpg" alt="admin" width={80} className='img-fluid rounded-circle shadow-sm' />
        <h4 className='mt-2 mb-0'>Admin</h4>
      </div>

      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white'><i className="bi bi-speedometer2 me-2"></i> Dashboard</Link>
      </div>

      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white'><i className="bi bi-people me-2"></i> Reg Users</Link>
      </div>

      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white'><i className="bi bi-search me-2"></i> Search</Link>
      </div>

      <button className='list-group-item list-group-item-action bg-dark text-white d-flex align-items-center' onClick={() => handleCollapse('category')}><i className='bi bi-pencil-square me-2'></i> Food Category <i className={`bi ${collapse.category ? 'bi-chevron-down' : 'bi-chevron-up'} ms-auto`}></i></button>
      {collapse.category && (
        <div className='ps-4'>
          <Link to="/add-category" className='list-group-item list-group-item-action bg-dark text-white'><i className='bi bi-plus me-2'></i> Add Category</Link>
          <Link className='list-group-item list-group-item-action bg-dark text-white'><i className="bi bi-grid me-2"></i> Manage Category</Link>
        </div>
      )}


      <button className='list-group-item list-group-item-action bg-dark text-white d-flex align-items-center' onClick={() => handleCollapse('item')}><i className='bi bi-pencil-square me-2'></i>Food Item <i className={`bi ${collapse.item ? 'bi-chevron-down' : 'bi-chevron-up'} ms-auto`}></i></button>
      <div style={{ display: `${collapse.item ? 'block' : 'none'}` }} className='ps-4'>
        <Link className='list-group-item list-group-item-action bg-dark text-white'><i className='bi bi-plus me-2'></i> Add Item</Link>
        <Link className='list-group-item list-group-item-action bg-dark text-white'><i className="bi bi-grid me-2"></i> Manage Item</Link>
      </div>

      <button className='list-group-item list-group-item-action bg-dark text-white d-flex align-items-center' onClick={() => handleCollapse('order')}><i className='bi bi-pencil-square me-2'></i>Food Orders <i className={`bi ${collapse.order ? 'bi-chevron-down' : 'bi-chevron-up'} ms-auto`}></i></button>
      {collapse.order && (
        <div className='ps-4'>
          <Link className='list-group-item list-group-item-action bg-dark text-white'><i className='bi bi-plus me-2'></i> Confirmed</Link>
          <Link className='list-group-item list-group-item-action bg-dark text-white'><i className='bi bi-grid me-2'></i> Being Prepared</Link>
          <Link className='list-group-item list-group-item-action bg-dark text-white'><i className='bi bi-plus me-2'></i> Food Pickup</Link>
          <Link className='list-group-item list-group-item-action bg-dark text-white'><i className='bi bi-plus me-2'></i> Delivered</Link>
          <Link className='list-group-item list-group-item-action bg-dark text-white'><i className='bi bi-plus me-2'></i> Canceld</Link>
          <Link className='list-group-item list-group-item-action bg-dark text-white'><i className='bi bi-plus me-2'></i> All Orders</Link>
        </div>
      )}

      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white'><i className="bi bi-star-half me-2"></i> B/W Date Reports</Link>
      </div>

      <div className='list-group list-group-flush'>
        <Link className='list-group-item list-group-item-action bg-dark text-white'><i className="bi bi-star-half me-2"></i> Manage Reviews</Link>
      </div>


    </div>
  )
}

export default AdminSidebar;