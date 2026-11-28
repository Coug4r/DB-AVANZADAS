import { useState } from "react";
import type {
    DocumentData,
    QueryDocumentSnapshot
} from 'firebase/firestore';

import { obtenerVehiculosPaginados, type Vehiculo } from "../services/vehiculosService";

export const VehiculoListaPaginado = () => {
    const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
    const [ultimoDocumento, setUltimoDocumento] = useState<QueryDocumentSnapshot<DocumentData>>();

    const cargarPrimeraPagina = async () => {
        const resultado = await obtenerVehiculosPaginados();
        setVehiculos(resultado.productos);
        setUltimoDocumento(resultado.ultimoDocumento);
    };

    const siguientePagina = async () => {
        if (!ultimoDocumento) return;

        const resultados = await obtenerVehiculosPaginados(ultimoDocumento);
        setVehiculos(resultados.productos);
        setUltimoDocumento(resultados.ultimoDocumento);
    };

    return (
        <div className="list-section">
            <h2 className="list-title">Productos paginados</h2>

            <button className="form-button" onClick={cargarPrimeraPagina}>
                Cargar Vehiculos
            </button>

            <div className="products-grid">
                {vehiculos.map((vehiculo) => (
                    <div key={vehiculo.id} className="product-card">
                        <h3 className="product-id">ID: {vehiculo.id}</h3>
                        
                        <p className="product-detail">
                            Stock: {vehiculo.tipo}
                        </p>

                        <p className="product-detail">
                            Nombre: {vehiculo.marca}
                        </p>

                        <p className="product-detail">
                            Precio: ${vehiculo.modelo}
                        </p>

                        <p className="product-detail">
                            Stock: {vehiculo.anio}
                        </p>
                        
                        <p className="product-detail">
                            Stock: {vehiculo.precio}
                        </p>

                        <p className="product-detail">
                            Stock: {vehiculo.stock}
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