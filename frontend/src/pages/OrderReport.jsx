import React,{useState,useEffect} from 'react'
import AdminLayout from '../components/AdminLayout'
import { useNavigate,Link } from 'react-router-dom'

const OrderReport = () => {
    const navigate=useNavigate()
    const [orders, setOrders] = useState([])
    const [formData,setFormData]=useState({
        from_date:'',
        to_date:'',
        status:'All'
    })

    useEffect(() => {
        const username = localStorage.getItem('admin_userId')
        if (!username) {
            navigate('/admin-login')
        }

    }, [])

    const submitForm=async()=>{
       let response=await fetch('http://127.0.0.1:8000/api/order_between_dates/',{
         method:'POST',
         headers:{'Content-Type': 'application/json'},
         body:JSON.stringify(formData)
       }) 
       let data=await response.json()
       console.log(data)
       setOrders(data)
       
    }

    return (
        <AdminLayout>
            <div className="container">
                <h3 className='text-center text-primary'><i className="bi bi-list-check me-2"></i>Between Dates Reports</h3>
                <div className="row mt-3">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className='mb-2'>
                            <label htmlFor="from_date" className='form-label'>Form Date</label>
                            <input onChange={(e)=>setFormData({
                                ...formData,
                                [e.target.name]:e.target.value
                            })} value={formData.from_date} className='form-control' type="date" name="from_date" id="from_date" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className='mb-2'>
                            <label htmlFor="to_date" className='form-label'>To Date</label>
                            <input onChange={(e)=>setFormData({
                                ...formData,
                                [e.target.name]:e.target.value
                            })} value={formData.to_date} className='form-control' type="date" name="to_date" id="to_date" />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className='mb-2'>
                            <label htmlFor="status" className='form-label'>Status</label>
                            <select onChange={(e)=>setFormData({
                                ...formData,
                                [e.target.name]:e.target.value
                            })} name="status" id="status" className='form-control'>
                                <option value="All">All Orders</option>
                                <option value="Order Confirmed">Confirmed</option>
                                <option value="Not_Confirmed">Not Confirmed</option>
                                <option value="Food Being Prepared">Being Prepared</option>
                                <option value="Food Pickup">Food Pickup</option>
                                <option value="Food Delivered">Delivered</option>
                                <option value="Order Cancelled">Cancelled</option>
                                
                            </select>
                        </div>
                    </div>
                    <div style={{width:'100%'}} className='text-end'>
                        <button className='btn btn-success ms-auto' onClick={submitForm}>Submit</button>
                    </div>
                </div>

                <table className='table table-striped mt-5'>
                    <thead className='table-dark'>
                        <tr>
                            <th>S.no</th>
                            <th>Order Number</th>
                            <th>Order Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length == 0 ? (
                            <tr>
                                <td colSpan={4} className='text-center'><strong>No Data Found</strong></td>
                            </tr>

                        ) : ( 
                            orders.map((order, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{order.order_number}</td>
                                        <td>{new Date(order.order_time).toLocaleString()}</td>
                                        <td><Link to={`/admin-view-order-details/${order.order_number}`} className='btn btn-primary'><i className='bi bi-eye me-1'></i>View Details </Link></td>
                                    </tr>
                                )
                            })

                        )}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default OrderReport
