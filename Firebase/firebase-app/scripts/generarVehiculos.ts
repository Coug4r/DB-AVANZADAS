
import { db } from "../src/firebase";
import { collection, addDoc } from "firebase/firestore";

const vehiculos = [
    // SEDAN
    { marca: "Toyota", modelo: "Corolla", precio: 24500, stock: 8, anio: 2025, tipo: "Sedan" },
    { marca: "Honda", modelo: "Civic", precio: 28000, stock: 12, anio: 2024, tipo: "Sedan" },
    { marca: "Hyundai", modelo: "Elantra", precio: 22000, stock: 5, anio: 2023, tipo: "Sedan" },
    { marca: "Mazda", modelo: "Mazda 3", precio: 26500, stock: 10, anio: 2026, tipo: "Sedan" },
    { marca: "Nissan", modelo: "Sentra", precio: 21500, stock: 0, anio: 2022, tipo: "Sedan" },
    { marca: "Kia", modelo: "K5", precio: 29000, stock: 7, anio: 2025, tipo: "Sedan" },

    // SUV
    { marca: "Toyota", modelo: "RAV4", precio: 38000, stock: 9, anio: 2025, tipo: "SUV" },
    { marca: "Hyundai", modelo: "Tucson", precio: 35000, stock: 6, anio: 2024, tipo: "SUV" },
    { marca: "Kia", modelo: "Sportage", precio: 33000, stock: 15, anio: 2023, tipo: "SUV" },
    { marca: "Mazda", modelo: "CX-5", precio: 42000, stock: 4, anio: 2026, tipo: "SUV" },
    { marca: "Chevrolet", modelo: "Tracker", precio: 26000, stock: 11, anio: 2022, tipo: "SUV" },
    { marca: "Ford", modelo: "Explorer", precio: 55000, stock: 3, anio: 2025, tipo: "SUV" },

    // PICKUP
    { marca: "Toyota", modelo: "Hilux", precio: 45000, stock: 8, anio: 2025, tipo: "Pickup" },
    { marca: "Ford", modelo: "Ranger", precio: 48000, stock: 5, anio: 2024, tipo: "Pickup" },
    { marca: "Chevrolet", modelo: "D-Max", precio: 39000, stock: 12, anio: 2023, tipo: "Pickup" },
    { marca: "Nissan", modelo: "Frontier", precio: 41000, stock: 0, anio: 2022, tipo: "Pickup" },
    { marca: "Mitsubishi", modelo: "L200", precio: 43000, stock: 7, anio: 2026, tipo: "Pickup" },
    { marca: "Volkswagen", modelo: "Amarok", precio: 52000, stock: 2, anio: 2025, tipo: "Pickup" },

    // HATCHBACK
    { marca: "Volkswagen", modelo: "Golf", precio: 30000, stock: 10, anio: 2024, tipo: "Hatchback" },
    { marca: "Suzuki", modelo: "Swift", precio: 18000, stock: 14, anio: 2023, tipo: "Hatchback" },
    { marca: "Kia", modelo: "Rio", precio: 17000, stock: 6, anio: 2022, tipo: "Hatchback" },
    { marca: "Mazda", modelo: "Mazda 2", precio: 19500, stock: 20, anio: 2026, tipo: "Hatchback" },
    { marca: "Toyota", modelo: "Yaris", precio: 20000, stock: 9, anio: 2025, tipo: "Hatchback" },
    { marca: "Hyundai", modelo: "i20", precio: 19000, stock: 0, anio: 2021, tipo: "Hatchback" },
];

const generarVehiculos = async () => {
    try {
        console.log("Iniciando generación de vehículos...");

        const coleccion = collection(db, "vehiculos");

        for (const vehiculo of vehiculos) {
            const documento = await addDoc(coleccion, vehiculo);

            console.log(
                `Vehículo agregado: ${vehiculo.marca} ${vehiculo.modelo} - ID: ${documento.id}`
            );
        }

        console.log(`\nProceso finalizado: ${vehiculos.length} vehículos agregados.`);

    } catch (error) {
        console.error("Error al generar vehículos:", error);
    }
};

generarVehiculos();
