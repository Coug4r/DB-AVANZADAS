import { useState } from 'react'
import './App.css'
import { ProductsForm } from './components/ProductsForm'
import { ProductoLista } from './components/ProductsList'
import { ProductoListaPaginado } from './components/productoListaPaginada'
import { obtenerProductosDisponibles, type Producto } from './services/productsService'
import { VehiculoListaPaginado } from './components/vehiculosListaPaginada'

function App() {
  const [vista, setVista] = useState<'registro' | 'lista' | 'listaPag' | 'listaVehi'>('registro')
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
            onClick={async () => {
              const productoConsulta = await obtenerProductosDisponibles();
              console.log(productoConsulta)
            }}
          >
            BUSCAR
          </button>

          <button
            className={`nav-btn ${vista === 'listaPag' ? 'active' : ''}`}
            onClick={() => setVista('listaPag')}
          >
            Lista de Productos Paginado
          </button>
          
          <button
            className={`nav-btn ${vista === 'listaVehi' ? 'active' : ''}`}
            onClick={() => setVista('listaVehi')}
          >
            Lista de Vehiculos Paginado
          </button>
        </div>
      </nav>

      <main className="main-content">
        {vista === 'registro' ? (
          <ProductsForm key={productoEditar?.id ?? "nuevo"} productoEditar={productoEditar} />
        ) : vista === 'listaPag' ? (
          <ProductoListaPaginado />
        ) : vista === 'listaVehi' ? (
          <VehiculoListaPaginado />
        ) : (
          <ProductoLista onEditar={handleEditar} />
        )}
      </main>
    </div>
  )
}

export default App

