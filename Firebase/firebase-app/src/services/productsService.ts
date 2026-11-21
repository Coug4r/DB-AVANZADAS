import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export interface Producto{
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

export const obtenerProductos = async (): Promise<Producto[]> => {
    const querySnapshot = await getDocs(collection(db, "productos"))

    const productos = querySnapshot.docs.map((docs)=> ({
        id: docs.id,
        ...docs.data()
    })) as Producto[];

    return productos
}