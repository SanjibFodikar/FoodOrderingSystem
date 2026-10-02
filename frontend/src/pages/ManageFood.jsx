import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data,Link } from 'react-router-dom';
import { CSVLink } from 'react-csv';

const ManageFood = () => {
    useEffect(() => {
        const username = localStorage.getItem('admin_userId')
        if (!username) {
          navigate('/admin-login')
        }
        receiveCategory()
      }, [])
    
      const [setFood, setAllFood] = useState([])
      const [backup,setBackup]=useState([])
    
      
      const receiveCategory = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/Foods_list/')
        let data = await response.json()
        setAllFood(data)
        setBackup(data)
        
      }
    
      const handleSearch=(s)=>{
        if (!s) {
          setAllFood(backup)
          return;
        }
        const val=s.toLowerCase()
        let filterdData=setFood.filter(data=>{
         return data.category_name.toLowerCase().includes(val)
        })
        setAllFood(filterdData)
      }
    
  return (
    <AdminLayout>
      <div className='container'>
        <h3 className='text-center text-primary'><i className="bi bi-list-check me-2"></i>Manage Food Items </h3>
        <h5 className='text-end'><i className="bi bi-database me-1"></i> Total Food
          <span className='ms-2 badge bg-success'>{setFood.length || 0}</span>
        </h5>
        <div className="mb-3 d-flex justify-content-between">
          <input type="text" onChange={(e)=>handleSearch(e.target.value)} style={{ width: '50%' }} className='mb-2 p-2' placeholder='Search Category' />
           <CSVLink data={setFood} filename={'food_list.csv'} className='btn btn-success pb-0'><i className="bi bi-filetype-csv me-2"></i> Export To CSV</CSVLink>
        </div>
        
        <table className='table table-striped">'>
          <thead className='table-dark '>
            <tr>
              <th>Si.No</th>
              <th>Food Category</th>
              <th>Food Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {setFood.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.category_name}</td>
                  <td>{data.item_name}</td>
                  <td>{data.item_description}</td>
                  <td>{data.item_quantity}</td>
                  <td>{data.item_price}</td>
                  <td><img src={data.image.url} alt="Food Image" /></td>
                  <td>
                    <Link className="btn btn-success">
                      <i className="bi bi-pencil-square me-1"></i>
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default ManageFood
