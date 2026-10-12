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
import UserLogin from './pages/UserLogin'
import FoodDetails from './pages/FoodDetails'
import Cart from './pages/Cart'
import PaymentPage from './pages/PaymentPage'
import MyOrders from './pages/MyOrders'
import OrderDetails from './pages/OrderDetails'
import Profile from './pages/Profile'
import ChangePassword from './pages/ChangePassword'

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
          <Route path='/user-login' element={<UserLogin/>}></Route>
          <Route path='/food/:id' element={<FoodDetails/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/payment' element={<PaymentPage/>}></Route>
          <Route path='/my-orders' element={<MyOrders/>}></Route>
          <Route path='/order-details/:order_number' element={<OrderDetails/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/change-password' element={<ChangePassword/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
