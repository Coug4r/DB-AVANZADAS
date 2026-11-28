import { db } from "../src/firebase";
import { collection, addDoc } from "firebase/firestore";

const vehiculos = [
    // SEDAN (10)
    { marca: "Toyota", modelo: "Corolla", precio: 24500, stock: 8, anio: 2025, tipo: "Sedan" },
    { marca: "Honda", modelo: "Civic", precio: 28000, stock: 12, anio: 2024, tipo: "Sedan" },
    { marca: "Hyundai", modelo: "Elantra", precio: 22000, stock: 5, anio: 2023, tipo: "Sedan" },
    { marca: "Mazda", modelo: "Mazda 3", precio: 26500, stock: 10, anio: 2026, tipo: "Sedan" },
    { marca: "Nissan", modelo: "Sentra", precio: 21500, stock: 0, anio: 2022, tipo: "Sedan" },
    { marca: "Kia", modelo: "K5", precio: 29000, stock: 7, anio: 2025, tipo: "Sedan" },
    // Nuevos Sedan
    { marca: "Chevrolet", modelo: "Onix", precio: 19500, stock: 11, anio: 2024, tipo: "Sedan" },
    { marca: "Volkswagen", modelo: "Jetta", precio: 27500, stock: 6, anio: 2025, tipo: "Sedan" },
    { marca: "Subaru", modelo: "Impreza", precio: 25000, stock: 4, anio: 2023, tipo: "Sedan" },
    { marca: "BMW", modelo: "Serie 3", precio: 49000, stock: 2, anio: 2026, tipo: "Sedan" },

    // SUV (10)
    { marca: "Toyota", modelo: "RAV4", precio: 38000, stock: 9, anio: 2025, tipo: "SUV" },
    { marca: "Hyundai", modelo: "Tucson", precio: 35000, stock: 6, anio: 2024, tipo: "SUV" },
    { marca: "Kia", modelo: "Sportage", precio: 33000, stock: 15, anio: 2023, tipo: "SUV" },
    { marca: "Mazda", modelo: "CX-5", precio: 42000, stock: 4, anio: 2026, tipo: "SUV" },
    { marca: "Chevrolet", modelo: "Tracker", precio: 26000, stock: 11, anio: 2022, tipo: "SUV" },
    { marca: "Ford", modelo: "Explorer", precio: 55000, stock: 3, anio: 2025, tipo: "SUV" },
    // Nuevos SUV
    { marca: "Honda", modelo: "CR-V", precio: 39500, stock: 8, anio: 2025, tipo: "SUV" },
    { marca: "Nissan", modelo: "X-Trail", precio: 36000, stock: 7, anio: 2024, tipo: "SUV" },
    { marca: "Subaru", modelo: "Forester", precio: 37500, stock: 5, anio: 2026, tipo: "SUV" },
    { marca: "Jeep", modelo: "Compass", precio: 34000, stock: 0, anio: 2023, tipo: "SUV" },

    // PICKUP (10)
    { marca: "Toyota", modelo: "Hilux", precio: 45000, stock: 8, anio: 2025, tipo: "Pickup" },
    { marca: "Ford", modelo: "Ranger", precio: 48000, stock: 5, anio: 2024, tipo: "Pickup" },
    { marca: "Chevrolet", modelo: "D-Max", precio: 39000, stock: 12, anio: 2023, tipo: "Pickup" },
    { marca: "Nissan", modelo: "Frontier", precio: 41000, stock: 0, anio: 2022, tipo: "Pickup" },
    { marca: "Mitsubishi", modelo: "L200", precio: 43000, stock: 7, anio: 2026, tipo: "Pickup" },
    { marca: "Volkswagen", modelo: "Amarok", precio: 52000, stock: 2, anio: 2025, tipo: "Pickup" },
    // Nuevos Pickup
    { marca: "RAM", modelo: "1500", precio: 58000, stock: 3, anio: 2025, tipo: "Pickup" },
    { marca: "Mazda", modelo: "BT-50", precio: 44000, stock: 6, anio: 2024, tipo: "Pickup" },
    { marca: "Isuzu", modelo: "D-Max", precio: 40500, stock: 9, anio: 2025, tipo: "Pickup" },
    { marca: "Great Wall", modelo: "Poer", precio: 32000, stock: 10, anio: 2023, tipo: "Pickup" },

    // HATCHBACK (10)
    { marca: "Volkswagen", modelo: "Golf", precio: 30000, stock: 10, anio: 2024, tipo: "Hatchback" },
    { marca: "Suzuki", modelo: "Swift", precio: 18000, stock: 14, anio: 2023, tipo: "Hatchback" },
    { marca: "Kia", modelo: "Rio", precio: 17000, stock: 6, anio: 2022, tipo: "Hatchback" },
    { marca: "Mazda", modelo: "Mazda 2", precio: 19500, stock: 20, anio: 2026, tipo: "Hatchback" },
    { marca: "Toyota", modelo: "Yaris", precio: 20000, stock: 9, anio: 2025, tipo: "Hatchback" },
    { marca: "Hyundai", modelo: "i20", precio: 19000, stock: 0, anio: 2021, tipo: "Hatchback" },
    // Nuevos Hatchback
    { marca: "Peugeot", modelo: "208", precio: 21000, stock: 8, anio: 2025, tipo: "Hatchback" },
    { marca: "Renault", modelo: "Sandero", precio: 16500, stock: 12, anio: 2023, tipo: "Hatchback" },
    { marca: "Chevrolet", modelo: "Spark", precio: 15500, stock: 5, anio: 2022, tipo: "Hatchback" },
    { marca: "Honda", modelo: "Fit", precio: 22500, stock: 4, anio: 2024, tipo: "Hatchback" },
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