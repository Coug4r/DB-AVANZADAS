import { useState, type SubmitEvent} from "react";
import guardarProducto from "../services/productsService";

export default function ProductsForm() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const id = await guardarProducto({
                nombre,
                precio: Number(precio),
                stock: Number(stock),
            });
            console.log("Producto creado:", id);

            setNombre("");
            setPrecio("");
            setStock("");
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    return(
        <div>
            <h1>Registro de Produccion</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Nombre'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <input
                        type='number'
                        placeholder='Precio'
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                    />
                    <input
                        type='number'
                        placeholder='Stock'
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                    <button type='submit'>GUARDAR</button>
                </form>
            </div>
        </div>
    )
}