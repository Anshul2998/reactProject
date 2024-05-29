import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./App.css"
import {BrowserRouter} from 'react-router-dom'
import StoreContextProvider from './Components/StoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StoreContextProvider>
  <App/>
  </StoreContextProvider>
  </BrowserRouter>
)
