import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import SalesBarChart from './SalesBarChart'
import { useNavigate, Link } from 'react-router-dom'
import { Icons, toast } from 'react-toastify'
import { CSVLink } from 'react-csv'
import TopProduct from './TopProduct'
import WeeklySalesChart from '../components/WeeklySalesChart'


const AdminDashboard = () => {
  const navigate = useNavigate()
 
  const [metrics, setMetrics] = useState({
    total_orders: 0,
    new_orders: 0,
    confirm_orders: 0,
    food_preparing: 0,
    food_pickup: 0,
    food_delivered: 0,
    cancelled_orders: 0,
    total_users: 0,
    total_categories: 0,
    today_sales: 0,
    week_sales: 0,
    month_sales: 0,
    year_sales: 0,
    total_reviews: 0,
    total_wishlists: 0
  });

   useEffect(() => {
    const username = localStorage.getItem('admin_userId')

    if (!username) {
      navigate('/admin-login')
      return
    }

    fetch('http://127.0.0.1:8000/api/dashboard_metrics/')
    .then(a=>a.json())
    .then(data=>{
      setMetrics(data)
    })

  }, [navigate])


  const CardData = [
    { title: 'Total Orders', key: 'total_orders', color: 'primary', icon: 'fas fa-shopping-cart' },
    { title: 'New Orders', key: 'new_orders', color: 'secondary', icon: 'fas fa-receipt' },
    { title: 'Confirmed Orders', key: 'confirm_orders', color: 'info', icon: 'fas fa-check-circle' },
    { title: 'Food Being Prepared', key: 'food_preparing', color: 'warning', icon: 'fas fa-utensils' },
    { title: 'Food Pickup', key: 'food_pickup', color: 'dark', icon: 'fas fa-box-open' },
    { title: 'Food Delivered', key: 'food_delivered', color: 'success', icon: 'fas fa-shipping-fast' },
    { title: 'Cancelled Orders', key: 'cancelled_orders', color: 'danger', icon: 'fas fa-times-circle' },
    { title: 'Total Users', key: 'total_users', color: 'primary', icon: 'fas fa-users' },
    { title: 'Total Categories', key: 'total_categories', color: 'primary', icon: 'fas fa-th-large' },
    { title: "Today's Sales", key: 'today_sales', color: 'primary', icon: 'fas fa-coins' },
    { title: "This Week's Sales", key: 'week_sales', color: 'secondary', icon: 'fas fa-calendar-week' },
    { title: "This Month's Sales", key: 'month_sales', color: 'dark', icon: 'fas fa-calendar-alt' },
    { title: "This Year's Sales", key: 'year_sales', color: 'success', icon: 'fas fa-calendar' },
    { title: 'Total Wishlists', key: 'total_wishlists', color: 'secondary', icon: 'fas fa-heart' },
    { title: 'Total Reviews', key: 'total_reviews', color: 'primary', icon: 'fas fa-star' },
];

  return (
    <>
      <AdminLayout>
        <div className="row gy-3">
          {CardData.map((item, i) => {
            return (
              <div className="col-md-3" key={i}>
                <div className={`card bg-${item.color}`}>
                  <div className="card-body text-white d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className='card-title'>{item.title}</h5>
                      <h2>{item.title.includes('Sales') ? `₹ ${metrics[item.key] || 0}`: metrics[item.key] || 0}</h2>
                    </div>
                    <i className={`${item.icon} fa-2x`}></i>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="row mt-3 gy-3">
          <div className="col-12 col-md-6">
             <SalesBarChart/>
          </div>

          <div className="col-12 col-md-6">
             <TopProduct/>
          </div>

          <div className="col-12 col-md-6">
             <WeeklySalesChart/>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}

export default AdminDashboard
