import react from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './components/Add'
import Orders from './components/Orders'
import List from './components/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const url = "http://localhost:4000"

  return (
    <>
    <ToastContainer/>
<Navbar/>
<hr />
<div className="app-content">
  <Sidebar/>
  <Routes>
    <Route path='/add' element={<Add url={url} />}/>
    <Route path='/list' element={<List url={url} />}/>
    <Route path='/orders' element={<Orders url={url} />}/>

  </Routes>
</div>
    </>
  )
}

export default App
