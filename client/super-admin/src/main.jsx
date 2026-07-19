import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoute from './routes/AppRoute.jsx'
import { StrictMode } from 'react'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter basename='/super-admin'>
   <Toaster position="bottom-right"/>

      <AppRoute/>

   
   </BrowserRouter>
  </StrictMode>,
)
