import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { data, Link } from 'react-router-dom';
import {CSVLink} from 'react-csv'

const ManageCategory = () => {

  useEffect(() => {
    const username = localStorage.getItem('admin_userId')
    if (!username) {
      navigate('/admin-login')
    }
    receiveCategory()
  }, [])

  const [TaskList, setTaskList] = useState([])
  const [backup,setBackup]=useState([])

  
  const receiveCategory = async () => {
    let response = await fetch('http://127.0.0.1:8000/api/category_list/')
    let data = await response.json()
    setTaskList(data)
    setBackup(data)
  }

  const handleSearch=(s)=>{
    if (!s) {
      setTaskList(backup)
      return;
    }
    const val=s.toLowerCase()
    let filterdData=TaskList.filter(data=>{
     return data.category_name.toLowerCase().includes(val)
    })
    setTaskList(filterdData)
  }

  return (
    <AdminLayout>
      <div className='container'>
        <h3 className='text-center text-primary'><i className="bi bi-list-check me-2"></i>Manage Food Category</h3>
        <h5 className='text-end'><i className="bi bi-database me-1"></i> Total Categories
          <span className='ms-2 badge bg-success'>{TaskList.length || 0}</span>
        </h5>
        <div className="mb-3 d-flex justify-content-between">
          <input type="text" onChange={(e)=>handleSearch(e.target.value)} style={{ width: '50%' }} className='mb-2 p-2' placeholder='Search Category' />
           <CSVLink data={TaskList} filename={'category_list.csv'} className='btn btn-success pb-0'><i className="bi bi-filetype-csv me-2"></i> Export To CSV</CSVLink>
        </div>
        
        <table className='table table-striped">'>
          <thead className='table-dark '>
            <tr>
              <th>Si.No</th>
              <th>Category Name</th>
              <th>Createion Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {TaskList.map((data, index) => {
              return (
                <tr key={data.id}>
                  <td>{index + 1}</td>
                  <td>{data.category_name}</td>
                  <td>{data.reg_date}</td>
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

export default ManageCategory
