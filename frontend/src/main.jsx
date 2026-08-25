import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './index.css'
import router from './routes/AppRouter.jsx';
import { ThemeProvider } from './context/ThemeProvider.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Toaster />
        <RouterProvider router={router}/>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
