import { useState } from 'react'
import './App.css'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AddCategory from './pages/AddCategory'
import ManageCategory from './pages/ManageCategory'
import AddFood from './pages/AddFood'
import ManageFood from './pages/ManageFood'
import SearchProduct from './pages/SearchProduct'
import UserRegistration from './pages/UserRegistration'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/admin-login' element={<AdminLogin/>}></Route>
          <Route path='/admin-dashboard' element={<AdminDashboard/>}></Route>
          <Route path='/add-category' element={<AddCategory/>}></Route>
          <Route path='/manage-category' element={<ManageCategory/>}></Route>
          <Route path='/add-food' element={<AddFood/>}></Route>
          <Route path='/manage-food' element={<ManageFood/>}></Route>
          <Route path='/search-food' element={<SearchProduct/>}></Route>
          <Route path='/register' element={<UserRegistration/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
