import React,{useState,useEffect} from 'react'
import PublicLayout from '../components/PublicLayout'
import { toast, ToastContainer } from 'react-toastify'
import { Link,useNavigate } from 'react-router-dom'

const UserLogin = () => {
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
        emailcont:'',
        password:''
    })

    const handleChange = (e) =>{
         setFormData({
            ...formData,
            [e.target.name]:e.target.value
         })
    }

    const handleSubmit =async (e)=>{
        e.preventDefault()

        const {emailcont,password}=formData

        try{

          const response = await fetch('http://127.0.0.1:8000/api/userLogin/',{
              method:'POST',
              headers:{"Content-Type": "application/json"},
              body:JSON.stringify({emailcont,password})  
          })

          const data=await response.json()

          if (response.status === 200) {
             toast.success(data.message)
             setFormData({
                emailcont:'',
                password:''
             })

             localStorage.setItem('userId',data.userId)
             localStorage.setItem('username',data.username)

             setTimeout(()=>{
               navigate('/user-home')
             },2000)

          }else{
            toast.error(data.message)
          }

        }catch(error){
            console.log(error)
        }

    } 

    return (
        <PublicLayout>
            <ToastContainer/>
            <div className="container mt-3 py-5">
                <div className="row align-items-center justify-content-center g-4">

                    {/* Registration Image */}
                    <div className="col-12 col-lg-7 text-center">
                        <img
                            src="/images/user_login.png"
                            alt="Food registration"
                            className="img-fluid"
                            style={{ maxHeight: "550px", objectFit: "contain" }}
                        />
                    </div>

                    {/* Registration Form */}
                    <div className="col-12 col-sm-10 col-md-8 col-lg-5">

                        <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

                            {/* Header */}
                            <div className="bg-dark text-white text-center p-4">
                                <i className="fa-solid fa-right-to-bracket fs-1 mb-2"></i>

                                <h3 className="fw-bold mb-1">
                                    Login Account
                                </h3>

                                <p className="mb-0 text-white-50">
                                    Join us and enjoy delicious food
                                </p>
                            </div>

                            {/* Form */}
                            <div className="card-body p-4 p-md-5">

                                <form onSubmit={handleSubmit}>

                                    {/* Email */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Email or Mobile Number
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <i className="fa-solid fa-address-book"></i>
                                            </span>

                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your email Or Mobile Number"
                                                name='emailcont'
                                                value={formData.emailcont}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">
                                            Password
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light">
                                                <i className="fa-solid fa-lock"></i>
                                            </span>

                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Create a password"
                                                name='password'
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>


                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        className="btn btn-dark w-100 py-2 fw-semibold"
                                    >
                                        <i className="fa-solid fa-right-to-bracket me-2"></i>
                                        Login
                                    </button>

                                </form>

                                <div className="text-center mt-4">
                                    <small className="text-muted">
                                         have an account?
                                        <Link
                                            to="/register"
                                            className="text-decoration-none fw-semibold ms-1"
                                        >
                                            Regiter
                                        </Link>
                                    </small>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PublicLayout>
    )
}

export default UserLogin
