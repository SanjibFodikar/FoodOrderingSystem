import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from 'react-router-dom';

const AddFood = () => {
    useEffect(() => {
        const username = localStorage.getItem('admin_userId')
        if (!username) {
            navigate('/admin-login')
        }
        receiveCategory()
    }, [])

    const [TaskList, setTaskList] = useState([])

    const receiveCategory = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/category_list/')
        let data = await response.json()
        setTaskList(data)

    }

    const [formData,setFormData]=useState({
        category : '',
        item_name : '',
        item_price : '',
        item_description : '',
        image : null,
        item_quantity : ''
    })

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleFileChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let data=new FormData()
        data.append('category',formData.category)
        data.append('item_description',formData.item_description)
        data.append('item_name',formData.item_name)
        data.append('item_quantity',formData.item_quantity)
        data.append('item_price',formData.item_price)
        data.append('image',formData.image)

        try {
          let response = await fetch('http://127.0.0.1:8000/api/add_food_item/', {
            method: "POST",
            body: data
          })
          let result = await response.json()
          if (response.status === 201) {
            toast.success(result.message)
          } else {
            toast.error(result.message)
            toast.error(result.errors)
          }
        }
        catch (error) {
          console.log(error)
        }
      }
   
    return (
        <AdminLayout>
            {/* <div className="container"> */}
            <div className="row d-flex align-items-center">
                <div className="col-12 col-md-12 col-lg-8">
                    <div className="shadow p-4  rounded">
                        <h4><i className="bi bi-plus-circle-fill me-2 mb-4 text-primary text-center"></i>Add Food Item</h4>

                        <ToastContainer position="top-center" />
                        <div className="card ">
                            <div className="card p-2 shadow-lg">
                                <div >
                                    <div className="card-body">
                                        <form action="" onSubmit={handleSubmit}  encType="multipart/form-data" className="was-validated">

                                            <div className="mb-3 mt-3">
                                                <label htmlFor="category" className="form-label fw-bold">
                                                    Food Categories:
                                                </label>

                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-grid"></i>
                                                    </span>
                                                    <select name="category" onChange={handleChange} className='form-select' id="category" required>
                                                        <option  value="">Choose Category</option>
                                                        {TaskList.map((data,index)=>{
                                                            return <option key={data.id} value={data.id}>{data.category_name}</option>
                                                        })}
                                                    </select>

                                                </div>
                                            </div>

                                            <div className="mb-3 mt-3">
                                                <label htmlFor="category" className="form-label fw-bold">
                                                    Food Item Name:
                                                </label>

                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-grid"></i>
                                                    </span>

                                                    <input type="text" value={formData.item_name} onChange={handleChange} name="item_name" className="form-control" id="item_name" placeholder="Enter Food Item Name" required />
                                                </div>
                                            </div>

                                            <div className="mb-3 mt-3">
                                                <label htmlFor="item_description" className="form-label fw-bold">
                                                    Description:
                                                </label>

                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-grid"></i>
                                                    </span>

                                                    <textarea type="text" value={formData.item_description} onChange={handleChange} name="item_description" className="form-control" id="item_description" placeholder="Enter Food Item Description" required />
                                                </div>
                                            </div>

                                            <div className="mb-3 mt-3">
                                                <label htmlFor="item_quantity" className="form-label fw-bold">
                                                    Food Item Quantity:
                                                </label>

                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-grid"></i>
                                                    </span>

                                                    <input type="text" value={formData.item_quantity} onChange={handleChange} name="item_quantity" className="form-control" id="item_quantity" placeholder="Enter Food Item Quantity" required />
                                                </div>
                                            </div>

                                             <div className="mb-3 mt-3">
                                                <label htmlFor="item_price" className="form-label fw-bold">
                                                    Price (₹):
                                                </label>

                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                         <i className="bi bi-grid"></i>
                                                    </span>

                                                    <input type="number" step={'0.01'} value={formData.item_price} onChange={handleChange} name="item_price" className="form-control" id="item_price" placeholder="Enter Food Item Price" required />
                                                </div>
                                            </div>

                                            <div className="mb-3 mt-3">
                                                <label htmlFor="image" className="form-label fw-bold">
                                                  Image :
                                                </label>

                                                <div className="input-group">
                                                    <span className="input-group-text">
                                                        <i className="bi bi-grid"></i>
                                                    </span>

                                                    <input type="file"  accept='image/*' onChange={handleFileChange} name="image" className="form-control" id="image" placeholder="Enter Food Image" required />
                                                </div>
                                            </div>

                                            <button type="submit" className="btn btn-primary me-auto">
                                                <i className="bi bi-plus-circle-fill me-2"></i> Add Food Item
                                            </button>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 text-secondary text-center">
                    <i class="fa-solid fa-pizza-slice" style={{fontSize:"200px"}}></i>
                </div>
            </div>
            {/* </div> */}
        </AdminLayout>
    )
}

export default AddFood
