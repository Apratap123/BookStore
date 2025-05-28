import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './component/navbar/Navbar'
import Home from './pages/Home'
import Footer from './component/footer/Footer'
import './index.css'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Cart from './pages/Cart'
import AllBooks from './pages/AllBooks'

function App() {
  return (
    <div>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="view-book-details/:id" element={<ViewBookDetails/>}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
