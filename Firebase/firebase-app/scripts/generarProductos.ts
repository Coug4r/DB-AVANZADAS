import { db } from "../src/firebase";
import { collection, addDoc } from "firebase/firestore";

const productos = [
    // TECNOLOGIA
    { nombre: "USB 32GB", categoria: "Tecnologia", precio: 10, stock: 25 },
    { nombre: "Mouse Inalámbrico", categoria: "Tecnologia", precio: 18, stock: 15 },
    { nombre: "Teclado Mecánico", categoria: "Tecnologia", precio: 65, stock: 8 },
    { nombre: "Monitor 24 pulgadas", categoria: "Tecnologia", precio: 180, stock: 5 },
    { nombre: "SSD 1TB NVMe", categoria: "Tecnologia", precio: 85, stock: 12 },
    { nombre: "Webcam Full HD", categoria: "Tecnologia", precio: 45, stock: 0 },

    // ACCESORIOS
    { nombre: "Cable HDMI 2m", categoria: "Accesorios", precio: 8, stock: 30 },
    { nombre: "Hub USB-C 6 en 1", categoria: "Accesorios", precio: 32, stock: 10 },
    { nombre: "Mousepad XL", categoria: "Accesorios", precio: 15, stock: 20 },
    { nombre: "Soporte para Laptop", categoria: "Accesorios", precio: 25, stock: 7 },
    { nombre: "Audífonos Bluetooth", categoria: "Accesorios", precio: 50, stock: 14 },
    { nombre: "Cargador Rápido 65W", categoria: "Accesorios", precio: 28, stock: 0 },

    // OFICINA
    { nombre: "Silla Ergonómica", categoria: "Oficina", precio: 210, stock: 4 },
    { nombre: "Lámpara LED de Escritorio", categoria: "Oficina", precio: 22, stock: 11 },
    { nombre: "Cuaderno de Notas A5", categoria: "Oficina", precio: 6, stock: 40 },
    { nombre: "Organizador de Cables", categoria: "Oficina", precio: 9, stock: 18 },
    { nombre: "Pizarra Acrílica", categoria: "Oficina", precio: 35, stock: 6 },
    { nombre: "Calculadora Científica", categoria: "Oficina", precio: 19, stock: 9 },

    // AUDIO Y VIDEO
    { nombre: "Micrófono Condensador USB", categoria: "Audio y Video", precio: 55, stock: 7 },
    { nombre: "Parlante Portátil", categoria: "Audio y Video", precio: 40, stock: 13 },
    { nombre: "Aro de Luz LED", categoria: "Audio y Video", precio: 24, stock: 16 },
    { nombre: "Trípode Ajustable", categoria: "Audio y Video", precio: 29, stock: 5 },
    { nombre: "Adaptador Audio 3.5mm", categoria: "Audio y Video", precio: 5, stock: 0 },
    { nombre: "Barra de Sonido Compacta", categoria: "Audio y Video", precio: 75, stock: 3 },
];

const generarProductos = async () => {
    try {
        console.log("Iniciando generación de productos...");

        const coleccion = collection(db, "productos");

        for (const producto of productos) {
            const documento = await addDoc(coleccion, producto);

            console.log(
                `Producto agregado: ${producto.nombre} (${producto.categoria}) - ID: ${documento.id}`
            );
        }

        console.log(`\nProceso finalizado: ${productos.length} productos agregados.`);
    } catch (error) {
        console.error("Error al generar productos:", error);
    }
};

generarProductos();