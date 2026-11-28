import { useState } from "react";
import type {
    DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore';

import { obtenerProductoPaginados, type Producto } from "../services/productsService";

export const ProductoListaPaginado = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [ultimoDocumento, setUltimoDocumento] = useState<QueryDocumentSnapshot<DocumentData>>();

    const cargarPrimeraPagina = async () => {
        const resultado = await obtenerProductoPaginados();
        setProductos(resultado.productos);
        setUltimoDocumento(resultado.ultimoDocumento);
    };

    const siguientePagina = async () => {
        if (!ultimoDocumento) return;

        const resultados = await obtenerProductoPaginados(ultimoDocumento);
        setProductos(resultados.productos);
        setUltimoDocumento(resultados.ultimoDocumento);
    };

    return (
        <div className="list-section">
            <h2 className="list-title">Productos paginados</h2>

            <button className="form-button" onClick={cargarPrimeraPagina}>
                Cargar Productos
            </button>

            <div className="products-grid">
                {productos.map((producto) => (
                    <div key={producto.id} className="product-card">
                        <h3 className="product-id">ID: {producto.id}</h3>

                        <p className="product-detail">
                            Nombre: {producto.nombre}
                        </p>

                        <p className="product-detail">
                            Precio: ${producto.precio}
                        </p>

                        <p className="product-detail">
                            Stock: {producto.stock}
                        </p>
                    </div>
                ))}
            </div>

            <button
                className="form-button"
                onClick={siguientePagina}
                disabled={!ultimoDocumento}
            >
                Siguiente
            </button>
        </div>
    );
};