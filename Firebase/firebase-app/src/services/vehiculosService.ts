import { db } from '../firebase';
import {
    collection,
    query,
    orderBy,
    getDocs,
    limit,
    QueryDocumentSnapshot,
    type DocumentData,
    startAfter,
} from 'firebase/firestore';

export interface Vehiculo {
    id: string,
    marca: string,
    modelo: string,
    precio: number,
    stock: number,
    anio: number,
    tipo: string
}

export const obtenerVehiculosPaginados = async (ultimoDocumento?: QueryDocumentSnapshot<DocumentData>) => {
    let consulta;
    if (ultimoDocumento) {
        consulta = query(collection(db, "vehiculos"), orderBy("precio", "asc"), startAfter(ultimoDocumento),
            limit(10))
    } else {
        consulta = query(collection(db, "vehiculos"), orderBy("precio", "asc"), limit(10))
    }

    const snapshot = await getDocs(consulta);

    const productos = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as Vehiculo[];

    const nuevoUltimoDocumento = snapshot.docs[snapshot.docs.length - 1];

    return { productos, ultimoDocumento: nuevoUltimoDocumento };
}