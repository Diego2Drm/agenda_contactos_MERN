import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CrudContextProvider } from './Context/userContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CrudContextProvider>
      <App />
    </CrudContextProvider>
  </StrictMode>,
)
