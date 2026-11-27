
import { db } from '../src/firebase';
import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    Query
} from 'firebase/firestore';

interface Vehiculo {
    id: string,
    marca: string,
    modelo: string,
    precio: number,
    stock: number,
    anio: number,
    tipo: string
}

const consultas: { titulo: string, consulta: Query }[] = [

    {
        titulo: "CONSULTA 1: Vehículos disponibles ordenados por precio",
        consulta: query(
            collection(db, "vehiculos"),
            where("stock", ">", 0),
            orderBy("precio", "asc")
        )
    },

    {
        titulo: "CONSULTA 2: SUV disponibles ordenados por precio",
        consulta: query(
            collection(db, "vehiculos"),
            where("stock", ">", 0),
            where("tipo", "==", "SUV"),
            orderBy("precio", "asc")
        )
    },

    {
        titulo: "CONSULTA 3: Vehículos entre $20,000 y $40,000",
        consulta: query(
            collection(db, "vehiculos"),
            where("stock", ">", 0),
            where("precio", ">=", 20000),
            where("precio", "<=", 40000),
            orderBy("precio", "asc")
        )
    },

    {
        titulo: "CONSULTA 4: Sedan desde 2023 ordenados por año",
        consulta: query(
            collection(db, "vehiculos"),
            where("stock", ">", 0),
            where("tipo", "==", "Sedan"),
            where("anio", ">=", 2023),
            orderBy("anio", "desc")
        )
    }

];

const obtenerVehiculosDisponibles = async (consulta: Query,titulo: string) => {
    console.group(`${titulo}`);
    try {
        const querySnapshot = await getDocs(consulta);

        const vehiculos = querySnapshot.docs.map((documento) => ({
            id: documento.id,
            ...documento.data()
        })) as Vehiculo[];

        if (vehiculos.length > 0) {
            console.table(vehiculos);
            console.log(`Total de vehículos encontrados: ${vehiculos.length}`);
        } else {
            console.log("No se encontraron vehículos.");
        }
    } catch (error) {
        console.error("Error en la consulta: ", error);
    }
    console.groupEnd();
};

// Ejecutar todas las consultas
const ejecutarConsultas = async () => {
    console.log("       RESULTADOS DE CONSULTAS");
    for (const item of consultas) {
        await obtenerVehiculosDisponibles(
            item.consulta,
            item.titulo
        );
    }
    console.log("       CONSULTAS FINALIZADAS");
};

ejecutarConsultas();
