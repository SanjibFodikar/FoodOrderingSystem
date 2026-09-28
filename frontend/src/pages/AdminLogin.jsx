import React from 'react';
import '../styles/admin_login.css';
import { useState,useEffect } from 'react';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = () => {
  const [formData,setFormData]=useState({
    'Username':'',
    'Password':''
  })

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit =async (e) =>{
     e.preventDefault();
     const response = await fetch('http://127.0.0.1:8000/api/admin_login_api/',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(formData)
     })
     const data=await response.json()
     if (response.status === 200) {
       toast.success(data.message)
       localStorage.setItem('admin_userId',data.username)
       setTimeout(()=>{
         window.location.href='/admin-dashboard';
       },2000)
     }else{
      toast.error(data.message)
     }
  }

  return (
    <>
   <ToastContainer position="top-center" />
    <div className="card d-flex justify-content-center align-items-center vh-100" style={{backgroundImage: "url('/images/food_bg.jpeg')",backgroundSize: "cover"}}>
      <div className="card p-2 shadow-lg" style={{ width:'100%', maxWidth: '500px' }}>
        <div >
          <h4 className="text-center"><i className="bi bi-box-arrow-in-right"></i> Login</h4>
          <div className="card-body">
            <form action="" onSubmit={handleSubmit} className="was-validated">

              <div className="mb-3 mt-3">
                <label htmlFor="uname" className="form-label">
                  Username:
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-person"></i>
                  </span>

                  <input type="text" value={formData.Username} onChange={handleChange} name="Username" className="form-control" id="uname" placeholder="Enter username" required />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="pwd" className="form-label">
                  Password:
                </label>

                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-key"></i>
                  </span>

                  <input type="password" value={formData.Password} onChange={handleChange} name="Password" className="form-control" id="upassword" placeholder="Enter password"  required />
                </div>
              </div>


              <button type="submit" className="btn btn-primary">
                <i className="bi bi-box-arrow-in-right me-2"></i> Login
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
     </>
  )
}

export default AdminLogin