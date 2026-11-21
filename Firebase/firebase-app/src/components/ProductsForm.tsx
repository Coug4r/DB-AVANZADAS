import { useState, type SubmitEvent } from "react";
import { actualizarProducto, guardarProducto, type Producto } from "../services/productsService";

interface Props {
    productoEditar: Producto | null;
}

export const ProductsForm = ({ productoEditar }: Props) => {
    const [nombre, setNombre] = useState(productoEditar?.nombre ?? "");
    const [precio, setPrecio] = useState(productoEditar?.precio.toString() ?? "");
    const [stock, setStock] = useState(productoEditar?.stock.toString() ?? "");

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            if (productoEditar) {
                await actualizarProducto(productoEditar.id, nombre, Number(precio), Number(stock));
                console.log("Producto actualizado")
            } else {
                const id = await guardarProducto(nombre, Number(precio), Number(stock));
                console.log("Producto creado:", id);

                setNombre("");
                setPrecio("");
                setStock("");
            }
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    return (
        <div className="form-section">
            <h1 className="form-title">Registro de Produccion</h1>
            <div>
                <form className="product-form" onSubmit={handleSubmit}>
                    <input
                        className="form-input"
                        type='text'
                        placeholder='Nombre'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type='number'
                        placeholder='Precio'
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type='number'
                        placeholder='Stock'
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <button className="form-button" type='submit'>{productoEditar? "Actualizar" : "Guardar"}</button>
                </form>
            </div>
        </div>
    );
};