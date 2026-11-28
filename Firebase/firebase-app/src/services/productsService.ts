
import { db } from '../firebase';
import {
    collection,
    addDoc,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    getDocs,
    limit,
    QueryDocumentSnapshot,
    type DocumentData,
    startAfter,
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

export const obtenerProductosDisponibles = async (): Promise<Producto[]> => {
    const consulta = query(
        collection(db, "productos"),
        //where("categoria", "==", "Tecnologia"),
        where("stock", ">", 0),
        where("precio", ">=", 300),
        where("precio", "<=", 500),
        limit(1),
        orderBy("precio", "asc")
    );

    const querySnapshot = await getDocs(consulta);

    const productos = querySnapshot.docs.map((documento) => ({
        id: documento.id,
        ...documento.data()
    })) as Producto[];

    return productos;
}

export const obtenerProductoPaginados = async (ultimoDocumento?: QueryDocumentSnapshot<DocumentData>) => {
    let consulta;
    if (ultimoDocumento) {
        consulta = query(collection(db, "productos"), orderBy("precio", "asc"), startAfter(ultimoDocumento),
            limit(5))
    } else {
        consulta = query(collection(db, "productos"), orderBy("precio", "asc"), limit(5))
    }

    const snapshot = await getDocs(consulta);

    const productos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Producto[];

    const nuevoUltimoDocumento = snapshot.docs[snapshot.docs.length - 1];

    return { productos, ultimoDocumento: nuevoUltimoDocumento };
}