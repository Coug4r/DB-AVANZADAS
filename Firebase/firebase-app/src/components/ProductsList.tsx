
import { useEffect, useState } from "react";
import {
    escucharProductos,
    eliminarProducto,
    type Producto
} from "../services/productsService";

interface Props {
    onEditar: (producto: Producto) => void;
}

export const ProductoLista = ({ onEditar }: Props) => {
    const [productos, setProductos] = useState<Producto[]>([]);

    useEffect(() => {
        const unsubscribe = escucharProductos((datos) => {
            setProductos(datos);
        });

        // Cancelar la suscripción al desmontar el componente
        return () => unsubscribe();

    }, []);

    const handleEliminar = async (id: string) => {
        try {
            await eliminarProducto(id);
            console.log("El producto fue eliminado");
        } catch (error) {
            console.log("Error", error);
        }
    };

    return (
        <div className="list-section">
            <h2 className="list-title">Lista de productos</h2>

            <div className="products-grid">
                {
                    productos.map((producto) => (
                        <div key={producto.id} className="product-card">
                            <h3 className="product-id">ID: {producto.id}</h3>

                            <p className="product-detail">
                                Nombre: {producto.nombre}
                            </p>

                            <p className="product-detail">
                                Precio: {producto.precio}
                            </p>

                            <p className="product-detail">
                                Stock: {producto.stock}
                            </p>

                            <button onClick={() => onEditar(producto)}>
                                EDITAR
                            </button>

                            <button onClick={() => handleEliminar(producto.id)}>
                                ELIMINAR
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
