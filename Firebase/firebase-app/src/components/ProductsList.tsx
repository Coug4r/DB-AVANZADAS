import { useEffect, useState } from "react";
import { obtenerProductos, type Producto } from "../services/productsService";

interface Props {
    onEditar: (producto: Producto) => void;
}

export const ProductoLista = ({onEditar}: Props)=> {
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(()=> {
        const cargarProductos = async ()=> {
            try {
                const datos = await obtenerProductos();
                setProductos(datos)
            } catch (error) {
                console.log("Error al mostrar productos: ", error)
            }
        }
        cargarProductos();
    }, [])

    return(
        <div className="list-section">
            <h2 className="list-title">Lista de productos</h2>
            <div className="products-grid">
            {
                productos.map((producto) => (
                    <div key={producto.id} className="product-card">
                        <h3 className="product-id">ID: {producto.id}</h3>
                        <p className="product-detail">Nombre: {producto.nombre}</p>
                        <p className="product-detail">Precio: {producto.precio}</p>
                        <p className="product-detail">Stock: {producto.stock}</p>
                        <button onClick={()=> onEditar(producto)}>EDITAR</button>
                    </div>
                ))
            }
            </div>
        </div>
    )
}