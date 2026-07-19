import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import Approute from './Routes/Approute'
import { Toaster } from 'react-hot-toast'




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <Toaster position="bottom-right" />



      <Approute />


    </BrowserRouter>

  </StrictMode>,
)
