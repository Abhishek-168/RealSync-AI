import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Workspace from './pages/Workspace';
import Home from './pages/Hero';
import App from './App';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/collaborate/:roomId" element={<Workspace />} />
      </Routes>
    </BrowserRouter>
    
  </StrictMode>,
)
