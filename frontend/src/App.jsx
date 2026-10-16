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
import OrderNotConfirmed from './pages/OrderNotConfirmed'
import OrderConfirmed from './pages/OrderConfirmed'
import BeingPrepared from './pages/BeingPrepared'
import FoodPickup from './pages/FoodPickup'
import FoodDelivered from './pages/FoodDelivered'
import CancelledOrders from './pages/CancelledOrders'
import AllOrders from './pages/AllOrders'
import OrderReport from './pages/OrderReport'
import ViewFoodOrder from './pages/ViewFoodOrder'
import SearchOrder from './pages/SearchOrder'
import EditCategory from './pages/EditCategory'
import EditFood from './pages/EditFood'
import ManageUser from './pages/ManageUser'

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
          <Route path='/edit-category/:id' element={<EditCategory/>}></Route>
          <Route path='/add-food' element={<AddFood/>}></Route>
          <Route path='/admin-edit-food/:id' element={<EditFood/>}></Route>
          <Route path='/manage-food' element={<ManageFood/>}></Route>
          <Route path='/search-food' element={<SearchProduct/>}></Route>
          <Route path='/register' element={<UserRegistration/>}></Route>
          <Route path='/user-login' element={<UserLogin/>}></Route>
          <Route path='/manage_user' element={<ManageUser/>}></Route>
          <Route path='/food/:id' element={<FoodDetails/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/payment' element={<PaymentPage/>}></Route>
          <Route path='/my-orders' element={<MyOrders/>}></Route>
          <Route path='/search-order' element={<SearchOrder/>}></Route>
          <Route path='/order-details/:order_number' element={<OrderDetails/>}></Route>
          <Route path='/admin-view-order-details/:order_number' element={<ViewFoodOrder/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/change-password' element={<ChangePassword/>}></Route>
          <Route path='/order-not-confirmed' element={<OrderNotConfirmed/>}></Route>
          <Route path='/order-confirmed' element={<OrderConfirmed/>}></Route>
          <Route path='/being-prepared' element={<BeingPrepared/>}></Route>
          <Route path='/food-pickup' element={<FoodPickup/>}></Route>
          <Route path='/food-delivered' element={<FoodDelivered/>}></Route>
          <Route path='/cancel-order' element={<CancelledOrders/>}></Route>
          <Route path='/all-orders' element={<AllOrders/>}></Route>
          <Route path='/order-report' element={<OrderReport/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
