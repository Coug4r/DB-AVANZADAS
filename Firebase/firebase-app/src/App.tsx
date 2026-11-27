import { useState } from 'react'
import './App.css'
import { ProductsForm } from './components/ProductsForm'
import { ProductoLista } from './components/ProductsList'
import { obtenerProductosDisponibles, type Producto } from './services/productsService'

function App() {
  const [vista, setVista] = useState<'registro' | 'lista'>('registro')
  const [productoEditar, setProductoEditar] = useState<Producto | null>(null);
  
  const handleEditar = (producto: Producto | null) => {
    setProductoEditar(producto);
    setVista('registro');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>Productos</h1>
        </div>
        <div className="navbar-links">
          <button
            className={`nav-btn ${vista === 'registro' ? 'active' : ''}`}
            onClick={() => handleEditar(null)}
          >
            Registrar Producto
          </button>
          <button
            className={`nav-btn ${vista === 'lista' ? 'active' : ''}`}
            onClick={() => setVista('lista')}
          >
            Lista de Productos
          </button>
          <button 
            className={`nav-btn ${vista === 'lista' ? 'active' : ''}`}
            onClick={async ()=>{
              const productoConsulta = await obtenerProductosDisponibles();
              console.log(productoConsulta)
            }}
          >
            BUSCAR
          </button>
        </div>
      </nav>

      <main className="main-content">
        {vista === 'registro' ? (
          <ProductsForm key={productoEditar?.id ?? "nuevo"} productoEditar={productoEditar} />
        ) : (
          <ProductoLista onEditar={handleEditar} />
        )}
      </main>
    </div>
  )
}

export default App

