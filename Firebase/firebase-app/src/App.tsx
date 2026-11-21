import { useState } from 'react'
import './App.css'
import ProductsForm from './components/ProductsForm'
import { ProductoLista } from './components/ProductsList'

function App() {
  const [vista, setVista] = useState<'registro' | 'lista'>('registro')

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Productos</h1>
        </div>
        <div className="navbar-links">
          <button
            className={`nav-btn ${vista === 'registro' ? 'active' : ''}`}
            onClick={() => setVista('registro')}
          >
            Registrar Producto
          </button>
          <button
            className={`nav-btn ${vista === 'lista' ? 'active' : ''}`}
            onClick={() => setVista('lista')}
          >
            Lista de Productos
          </button>
        </div>
      </nav>

      <main className="main-content">
        {vista === 'registro' ? <ProductsForm /> : <ProductoLista />}
      </main>
    </div>
  )
}

export default App

