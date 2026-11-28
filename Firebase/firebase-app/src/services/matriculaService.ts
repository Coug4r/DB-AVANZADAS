
import {
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc
} from 'firebase/firestore';

import { db } from '../firebase';

export interface Matricula {
    id: string;
    estudiantesID: string;
    estudianteNombre: string;
    cursoID: string;
    cursoNombre: string;
    estado: string;
    periodo: string;
}

const matriculasRef = collection(db, 'matriculas');

// 1. Cursos de un estudiante
export const obtenerCursosPorEstudiante = async (
    estudianteId: string
): Promise<Matricula[]> => {

    const consulta = query(
        matriculasRef,
        where('estudiantesID', '==', estudianteId)
    );

    const resultado = await getDocs(consulta);

    return resultado.docs.map(d => ({
        id: d.id,
        ...d.data()
    } as Matricula));
};

// 2. Estudiantes de un curso
export const obtenerEstudiantesPorCurso = async (
    cursoId: string
): Promise<Matricula[]> => {

    const consulta = query(
        matriculasRef,
        where('cursoID', '==', cursoId)
    );

    const resultado = await getDocs(consulta);

    return resultado.docs.map(d => ({
        id: d.id,
        ...d.data()
    } as Matricula));
};

// 3. Matrículas activas
export const obtenerMatriculasActivas = async (): Promise<Matricula[]> => {

    const consulta = query(
        matriculasRef,
        where('estado', '==', 'ACTIVA')
    );

    const resultado = await getDocs(consulta);

    return resultado.docs.map(d => ({
        id: d.id,
        ...d.data()
    } as Matricula));
};

// 4. Matrícula por ID
export const obtenerMatriculaPorId = async (
    matriculaId: string
): Promise<Matricula | null> => {

    const referencia = doc(db, 'matriculas', matriculaId);

    const resultado = await getDoc(referencia);

    if (!resultado.exists()) {
        return null;
    }

    return {
        id: resultado.id,
        ...resultado.data()
    } as Matricula;
};
