import { db } from "../src/firebase";
import { collection, addDoc, terminate } from "firebase/firestore";

const titulos = [
    // PELICULAS (22)
    { titulo: "El Padrino", tipo: "pelicula", genero: "Drama", anio: 1972, calificacion: 9.2, disponible: true, detalles: { creador: "Francis Ford Coppola", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 175 } },
    { titulo: "Pulp Fiction", tipo: "pelicula", genero: "Crimen", anio: 1994, calificacion: 8.9, disponible: true, detalles: { creador: "Quentin Tarantino", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 154 } },
    { titulo: "Forrest Gump", tipo: "pelicula", genero: "Drama", anio: 1994, calificacion: 8.8, disponible: true, detalles: { creador: "Robert Zemeckis", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 142 } },
    { titulo: "Matrix", tipo: "pelicula", genero: "Ciencia ficción", anio: 1999, calificacion: 8.7, disponible: false, detalles: { creador: "Lana y Lilly Wachowski", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 136 } },
    { titulo: "El viaje de Chihiro", tipo: "pelicula", genero: "Animación", anio: 2001, calificacion: 8.6, disponible: true, detalles: { creador: "Hayao Miyazaki", pais: "Japón", idioma: "Japonés", duracionMin: 125 } },
    { titulo: "Ciudad de Dios", tipo: "pelicula", genero: "Drama", anio: 2002, calificacion: 8.6, disponible: false, detalles: { creador: "Fernando Meirelles", pais: "Brasil", idioma: "Portugués", duracionMin: 130 } },
    { titulo: "El laberinto del fauno", tipo: "pelicula", genero: "Fantasía", anio: 2006, calificacion: 8.2, disponible: true, detalles: { creador: "Guillermo del Toro", pais: "España", idioma: "Español", duracionMin: 118 } },
    { titulo: "El caballero de la noche", tipo: "pelicula", genero: "Acción", anio: 2008, calificacion: 9.0, disponible: true, detalles: { creador: "Christopher Nolan", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 152 } },
    { titulo: "WALL-E", tipo: "pelicula", genero: "Animación", anio: 2008, calificacion: 8.4, disponible: true, detalles: { creador: "Andrew Stanton", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 98 } },
    { titulo: "El secreto de sus ojos", tipo: "pelicula", genero: "Drama", anio: 2009, calificacion: 8.2, disponible: true, detalles: { creador: "Juan José Campanella", pais: "Argentina", idioma: "Español", duracionMin: 129 } },
    { titulo: "El origen", tipo: "pelicula", genero: "Ciencia ficción", anio: 2010, calificacion: 8.8, disponible: true, detalles: { creador: "Christopher Nolan", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 148 } },
    { titulo: "Interestelar", tipo: "pelicula", genero: "Ciencia ficción", anio: 2014, calificacion: 8.7, disponible: true, detalles: { creador: "Christopher Nolan", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 169 } },
    { titulo: "Whiplash", tipo: "pelicula", genero: "Drama", anio: 2014, calificacion: 8.5, disponible: false, detalles: { creador: "Damien Chazelle", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 106 } },
    { titulo: "Relatos salvajes", tipo: "pelicula", genero: "Comedia", anio: 2014, calificacion: 8.1, disponible: true, detalles: { creador: "Damián Szifron", pais: "Argentina", idioma: "Español", duracionMin: 122 } },
    { titulo: "Mad Max: Furia en el camino", tipo: "pelicula", genero: "Acción", anio: 2015, calificacion: 8.1, disponible: false, detalles: { creador: "George Miller", pais: "Australia", idioma: "Inglés", duracionMin: 120 } },
    { titulo: "Coco", tipo: "pelicula", genero: "Animación", anio: 2017, calificacion: 8.4, disponible: true, detalles: { creador: "Lee Unkrich", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 105 } },
    { titulo: "¡Huye!", tipo: "pelicula", genero: "Terror", anio: 2017, calificacion: 7.8, disponible: true, detalles: { creador: "Jordan Peele", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 104 } },
    { titulo: "Roma", tipo: "pelicula", genero: "Drama", anio: 2018, calificacion: 7.7, disponible: false, detalles: { creador: "Alfonso Cuarón", pais: "México", idioma: "Español", duracionMin: 135 } },
    { titulo: "Parásitos", tipo: "pelicula", genero: "Drama", anio: 2019, calificacion: 8.5, disponible: true, detalles: { creador: "Bong Joon-ho", pais: "Corea del Sur", idioma: "Coreano", duracionMin: 132 } },
    { titulo: "El hoyo", tipo: "pelicula", genero: "Terror", anio: 2019, calificacion: 7.0, disponible: true, detalles: { creador: "Galder Gaztelu-Urrutia", pais: "España", idioma: "Español", duracionMin: 94 } },
    { titulo: "Dune", tipo: "pelicula", genero: "Ciencia ficción", anio: 2021, calificacion: 8.0, disponible: true, detalles: { creador: "Denis Villeneuve", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 155 } },
    { titulo: "Oppenheimer", tipo: "pelicula", genero: "Drama", anio: 2023, calificacion: 8.3, disponible: false, detalles: { creador: "Christopher Nolan", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 180 } },

    // SERIES (20)
    { titulo: "Los Soprano", tipo: "serie", genero: "Drama", anio: 1999, calificacion: 9.2, disponible: true, detalles: { creador: "David Chase", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 55, temporadas: 6 } },
    { titulo: "The Wire", tipo: "serie", genero: "Crimen", anio: 2002, calificacion: 9.3, disponible: false, detalles: { creador: "David Simon", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 60, temporadas: 5 } },
    { titulo: "The Office", tipo: "serie", genero: "Comedia", anio: 2005, calificacion: 9.0, disponible: true, detalles: { creador: "Greg Daniels", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 22, temporadas: 9 } },
    { titulo: "Avatar: La leyenda de Aang", tipo: "serie", genero: "Animación", anio: 2005, calificacion: 9.3, disponible: true, detalles: { creador: "Michael DiMartino y Bryan Konietzko", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 23, temporadas: 3 } },
    { titulo: "Breaking Bad", tipo: "serie", genero: "Drama", anio: 2008, calificacion: 9.5, disponible: true, detalles: { creador: "Vince Gilligan", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 49, temporadas: 5 } },
    { titulo: "Sherlock", tipo: "serie", genero: "Crimen", anio: 2010, calificacion: 9.1, disponible: false, detalles: { creador: "Steven Moffat y Mark Gatiss", pais: "Reino Unido", idioma: "Inglés", duracionMin: 90, temporadas: 4 } },
    { titulo: "Juego de tronos", tipo: "serie", genero: "Fantasía", anio: 2011, calificacion: 9.2, disponible: true, detalles: { creador: "David Benioff y D. B. Weiss", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 57, temporadas: 8 } },
    { titulo: "Black Mirror", tipo: "serie", genero: "Ciencia ficción", anio: 2011, calificacion: 8.7, disponible: true, detalles: { creador: "Charlie Brooker", pais: "Reino Unido", idioma: "Inglés", duracionMin: 60, temporadas: 7 } },
    { titulo: "Peaky Blinders", tipo: "serie", genero: "Drama", anio: 2013, calificacion: 8.7, disponible: true, detalles: { creador: "Steven Knight", pais: "Reino Unido", idioma: "Inglés", duracionMin: 60, temporadas: 6 } },
    { titulo: "Better Call Saul", tipo: "serie", genero: "Drama", anio: 2015, calificacion: 9.0, disponible: true, detalles: { creador: "Vince Gilligan y Peter Gould", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 46, temporadas: 6 } },
    { titulo: "Narcos", tipo: "serie", genero: "Crimen", anio: 2015, calificacion: 8.7, disponible: false, detalles: { creador: "Chris Brancato, Carlo Bernard y Doug Miro", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 50, temporadas: 3 } },
    { titulo: "Stranger Things", tipo: "serie", genero: "Ciencia ficción", anio: 2016, calificacion: 8.7, disponible: true, detalles: { creador: "Matt y Ross Duffer", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 55, temporadas: 5 } },
    { titulo: "The Crown", tipo: "serie", genero: "Drama", anio: 2016, calificacion: 8.6, disponible: true, detalles: { creador: "Peter Morgan", pais: "Reino Unido", idioma: "Inglés", duracionMin: 58, temporadas: 6 } },
    { titulo: "La casa de papel", tipo: "serie", genero: "Crimen", anio: 2017, calificacion: 8.2, disponible: true, detalles: { creador: "Álex Pina", pais: "España", idioma: "Español", duracionMin: 50, temporadas: 3 } },
    { titulo: "Dark", tipo: "serie", genero: "Ciencia ficción", anio: 2017, calificacion: 8.7, disponible: true, detalles: { creador: "Baran bo Odar y Jantje Friese", pais: "Alemania", idioma: "Alemán", duracionMin: 60, temporadas: 3 } },
    { titulo: "Chernobyl", tipo: "serie", genero: "Drama", anio: 2019, calificacion: 9.3, disponible: true, detalles: { creador: "Craig Mazin", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 65, temporadas: 1 } },
    { titulo: "The Mandalorian", tipo: "serie", genero: "Ciencia ficción", anio: 2019, calificacion: 8.6, disponible: false, detalles: { creador: "Jon Favreau", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 40, temporadas: 3 } },
    { titulo: "Arcane", tipo: "serie", genero: "Animación", anio: 2021, calificacion: 9.0, disponible: true, detalles: { creador: "Christian Linke y Alex Yee", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 40, temporadas: 2 } },
    { titulo: "El juego del calamar", tipo: "serie", genero: "Drama", anio: 2021, calificacion: 8.0, disponible: true, detalles: { creador: "Hwang Dong-hyuk", pais: "Corea del Sur", idioma: "Coreano", duracionMin: 55, temporadas: 3 } },
    { titulo: "Merlina", tipo: "serie", genero: "Fantasía", anio: 2022, calificacion: 8.0, disponible: true, detalles: { creador: "Alfred Gough y Miles Millar", pais: "Estados Unidos", idioma: "Inglés", duracionMin: 50, temporadas: 2 } },
];

const generarTitulos = async () => {
    try {
        console.log("Iniciando generación de películas y series...");

        const coleccion = collection(db, "titulos");

        for (const item of titulos) {
            const documento = await addDoc(coleccion, item);

            console.log(
                `Título agregado: ${item.titulo} (${item.anio}) - ID: ${documento.id}`
            );
        }

        console.log(`\nProceso finalizado: ${titulos.length} títulos agregados.`);
    } catch (error) {
        console.error("Error al generar títulos:", error);
    } finally {
        // Cierra la conexión para que el script pueda terminar
        await terminate(db);
    }
};

generarTitulos();