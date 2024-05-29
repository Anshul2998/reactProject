import React, { useState } from 'react'
import Mynav from './Components/Mynav'
import {Routes,Route} from "react-router-dom"
import Home from './Components/Home'
import Cart from './Components/Cart'
import Placeorder from './Components/Placeorder'
import Footer from './Components/Footer'
import LoginPopup from './Components/LoginPopup'
import Verify from '../Verify'
import Myorders from './Components/Myorders'
function App() {
  const[showLogin,setShowLogin]=useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className="app">
    <Mynav setShowLogin={setShowLogin}/>
<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Cart' element={<Cart/>}/>
    <Route path='/Order' element={<Placeorder/>}/>
    <Route path='/verify' element={<Verify/>}/>
    <Route path='/myorders' element={<Myorders/>}/>
</Routes>
    </div>
    <Footer/>

    </>
  )
}

export default App
