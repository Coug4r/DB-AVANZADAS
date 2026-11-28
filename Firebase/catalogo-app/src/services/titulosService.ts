import {
    collection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    getDocs,
    doc,
    getDoc,
    type QueryConstraint,
    type QueryDocumentSnapshot
} from 'firebase/firestore';

import { db } from '../firebase';

export interface Titulo {
    id: string;
    titulo: string;
    tipo: 'pelicula' | 'serie';
    genero: string;
    anio: number;
    calificacion: number;
    disponible: boolean;
    detalles: {
        creador: string;
        pais: string;
        idioma: string;
        duracionMin: number;
        temporadas?: number;
    };
}

const titulosRef = collection(db, 'titulos');

export const TAMANO_PAGINA = 10;

export type Cursor = QueryDocumentSnapshot | null;

export interface Pagina {
    titulos: Titulo[];
    ultimo: Cursor;
}

// Lee una sola página (máximo 10) a partir del cursor recibido
const obtenerPagina = async (
    cursor: Cursor,
    ...restricciones: QueryConstraint[]
): Promise<Pagina> => {

    const consulta = query(
        titulosRef,
        ...restricciones,
        ...(cursor ? [startAfter(cursor)] : []),
        limit(TAMANO_PAGINA)
    );

    const resultado = await getDocs(consulta);

    return {
        titulos: resultado.docs.map(d => ({
            id: d.id,
            ...d.data()
        } as Titulo)),
        ultimo: resultado.docs.at(-1) ?? null
    };
};

// 1. Películas o series, en orden alfabético
export const obtenerTitulosPorTipo = (
    tipo: Titulo['tipo'],
    cursor: Cursor = null
): Promise<Pagina> =>
    obtenerPagina(
        cursor,
        where('tipo', '==', tipo),
        orderBy('titulo', 'asc')
    );

// 2. Títulos de un género, del mejor al peor calificado
export const obtenerTitulosPorGenero = (
    genero: string,
    cursor: Cursor = null
): Promise<Pagina> =>
    obtenerPagina(
        cursor,
        where('genero', '==', genero),
        orderBy('calificacion', 'desc')
    );

// 3. Estrenos dentro de un rango de años
export const obtenerTitulosPorRangoAnios = (
    desde: number,
    hasta: number,
    cursor: Cursor = null
): Promise<Pagina> =>
    obtenerPagina(
        cursor,
        where('anio', '>=', desde),
        where('anio', '<=', hasta),
        orderBy('anio', 'desc')
    );

// 4. Títulos disponibles, del mejor al peor calificado
export const obtenerTitulosDisponibles = (
    cursor: Cursor = null
): Promise<Pagina> =>
    obtenerPagina(
        cursor,
        where('disponible', '==', true),
        orderBy('calificacion', 'desc')
    );

// 5. Detalle de un título por ID
export const obtenerTituloPorId = async (
    tituloId: string
): Promise<Titulo | null> => {

    const referencia = doc(db, 'titulos', tituloId);

    const resultado = await getDoc(referencia);

    if (!resultado.exists()) {
        return null;
    }

    return {
        id: resultado.id,
        ...resultado.data()
    } as Titulo;
};