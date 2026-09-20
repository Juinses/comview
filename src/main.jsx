// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Importamos nuestro nuevo proveedor
import { ProveedorEncargos } from './contexto/encargos_context.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Envolvemos toda la aplicación en el estado global */}
    <ProveedorEncargos>
      <App />
    </ProveedorEncargos>
  </StrictMode>,
)