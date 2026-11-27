
import { db } from '../firebase';
import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc
} from 'firebase/firestore';

export interface Producto {
    id: string,
    nombre: string,
    precio: number,
    stock: number
}

export const guardarProducto = async (
    nombre: string,
    precio: number,
    stock: number
) => {
    try {
        const docRef = await addDoc(collection(db, "productos"), {
            nombre,
            precio: Number(precio),
            stock: Number(stock),
        });
        console.log("Producto creado: ", docRef.id)
    } catch (error) {
        console.log("Error: " + error)
    }
}

// Escuchar productos en tiempo real
export const escucharProductos = (
    callback: (productos: Producto[]) => void
) => {
    const productosRef = collection(db, "productos");

    const unsubscribe = onSnapshot(productosRef, (querySnapshot) => {
        const productos = querySnapshot.docs.map((documento) => ({
            id: documento.id,
            ...documento.data()
        })) as Producto[];

        callback(productos);
    }, (error) => {
        console.log("Error al escuchar productos: ", error);
    });

    return unsubscribe;
}

export const actualizarProducto = async (
    id: string,
    nombre: string,
    precio: number,
    stock: number
) => {
    const productoRef = doc(db, "productos", id);

    await updateDoc(productoRef, {
        nombre,
        precio,
        stock
    });
}

export const eliminarProducto = async (id: string) => {
    const productoRef = doc(db, "productos", id);

    await deleteDoc(productoRef);
}
