import React,{useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/admin_sidebar.css';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { useState } from 'react';


const AdminLayout = ({children}) => {
  const navigate = useNavigate()
  const [openSidebar,setOpenSidebar]=useState(true)
  useEffect(()=>{
    const username = localStorage.getItem('admin_userId')
    if (!username) {
      navigate('/admin-login')
    }

    setSidebarResize()
    window.addEventListener('resize',setSidebarResize)

    return ()=> window.removeEventListener('resize',setSidebarResize)
  },[])

  const setSidebarResize = () =>{
    if (window.innerWidth<768) {
      setOpenSidebar(false) // mobile view
    }
    else{
      setOpenSidebar(true) // Desktop VIew
    }
  }

  const toogleSidebar=()=>{
    setOpenSidebar(prev=>!prev)
  }

  return (
    <div className='d-flex'>
      {openSidebar && <AdminSidebar/>}
       <div id={openSidebar ? 'page-content-wrapper-max' : 'page-content-wrapper-min'} style={{width:'100%'}}>
          <AdminHeader toogleSidebar={toogleSidebar} openSidebar={openSidebar}/>
          <div className="container-fluid mt-4">
             {children}
          </div>
       </div>
    </div>
  )
}

export default AdminLayout
