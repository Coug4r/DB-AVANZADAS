import { useState } from 'react';

import {
    type Titulo,
    type Cursor,
    type Pagina,
    TAMANO_PAGINA,
    obtenerTitulosPorTipo,
    obtenerTitulosPorGenero,
    obtenerTitulosPorRangoAnios,
    obtenerTitulosDisponibles
} from '../services/titulosService';

import './ConsultaTitulos.css';

type TipoConsulta = 'tipo' | 'genero' | 'anios' | 'disponibles';

type Consulta = (cursor: Cursor) => Promise<Pagina>;

const GENEROS = [
    'Acción', 'Animación', 'Ciencia ficción', 'Comedia',
    'Crimen', 'Drama', 'Fantasía', 'Terror'
];

const CONSULTAS: { valor: TipoConsulta; texto: string }[] = [
    { valor: 'tipo', texto: 'Por tipo' },
    { valor: 'genero', texto: 'Por género' },
    { valor: 'anios', texto: 'Por años' },
    { valor: 'disponibles', texto: 'Disponibles' }
];

function ConsultaTitulos() {

    const [tipoConsulta, setTipoConsulta] = useState<TipoConsulta>('tipo');
    const [tipo, setTipo] = useState<Titulo['tipo']>('pelicula');
    const [genero, setGenero] = useState('Drama');
    const [desde, setDesde] = useState('2010');
    const [hasta, setHasta] = useState('2020');

    // Consulta ya ejecutada: la paginación usa siempre los mismos filtros
    const [consulta, setConsulta] = useState<Consulta | null>(null);
    // cursores[n] es el punto de partida de la página n
    const [cursores, setCursores] = useState<Cursor[]>([null]);
    const [numeroPagina, setNumeroPagina] = useState(0);
    const [ultimo, setUltimo] = useState<Cursor>(null);
    const [haySiguiente, setHaySiguiente] = useState(false);

    const [titulos, setTitulos] = useState<Titulo[]>([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const limpiarResultados = () => {
        setConsulta(null);
        setCursores([null]);
        setNumeroPagina(0);
        setUltimo(null);
        setHaySiguiente(false);
        setTitulos([]);
        setError('');
    };

    const cargarPagina = async (
        consultaActual: Consulta,
        numero: number,
        historial: Cursor[]
    ) => {

        setError('');
        setCargando(true);

        try {

            const pagina = await consultaActual(historial[numero]);

            // El total era múltiplo de 10: no hay más páginas
            if (numero > 0 && pagina.titulos.length === 0) {
                setHaySiguiente(false);
                return;
            }

            setTitulos(pagina.titulos);
            setUltimo(pagina.ultimo);
            setCursores(historial);
            setNumeroPagina(numero);
            setHaySiguiente(pagina.titulos.length === TAMANO_PAGINA);

        } catch (err) {

            console.error('Error en la consulta:', err);
            setError('No se pudo consultar Firestore. Revise la consola.');

        } finally {
            setCargando(false);
        }
    };

    const construirConsulta = (): Consulta => {

        switch (tipoConsulta) {

            // 1. Por tipo
            case 'tipo':
                return cursor => obtenerTitulosPorTipo(tipo, cursor);

            // 2. Por género
            case 'genero':
                return cursor => obtenerTitulosPorGenero(genero, cursor);

            // 3. Por rango de años
            case 'anios':
                return cursor => obtenerTitulosPorRangoAnios(
                    Number(desde), Number(hasta), cursor
                );

            // 4. Disponibles
            case 'disponibles':
                return cursor => obtenerTitulosDisponibles(cursor);
        }
    };

    const ejecutarConsulta = (e: { preventDefault: () => void }) => {

        e.preventDefault();
        limpiarResultados();

        if (tipoConsulta === 'anios' &&
            (!desde || !hasta || Number(desde) > Number(hasta))) {
            setError('Ingrese un rango válido: "Desde" no puede superar a "Hasta".');
            return;
        }

        const nueva = construirConsulta();
        setConsulta(() => nueva);
        cargarPagina(nueva, 0, [null]);
    };

    const irSiguiente = () => {
        if (!consulta) return;
        const historial = [...cursores.slice(0, numeroPagina + 1), ultimo];
        cargarPagina(consulta, numeroPagina + 1, historial);
    };

    const irAnterior = () => {
        if (!consulta) return;
        cargarPagina(consulta, numeroPagina - 1, cursores);
    };

    return (
        <div className="cartelera">

            <header className="cartelera__cabecera">
                <h1>Catálogo de Películas y Series</h1>
                <p>Elija un filtro y explore la cartelera.</p>
            </header>

            <form className="filtros" onSubmit={ejecutarConsulta}>

                <div className="filtros__pestanas" role="group" aria-label="Tipo de consulta">
                    {CONSULTAS.map(opcion => (
                        <button
                            key={opcion.valor}
                            type="button"
                            className="pestana"
                            aria-pressed={tipoConsulta === opcion.valor}
                            disabled={cargando}
                            onClick={() => {
                                setTipoConsulta(opcion.valor);
                                limpiarResultados();
                            }}
                        >
                            {opcion.texto}
                        </button>
                    ))}
                </div>

                <div className="filtros__campos">

                    {tipoConsulta === 'tipo' && (
                        <label>
                            Tipo
                            <select value={tipo}
                                onChange={e => setTipo(e.target.value as Titulo['tipo'])}>
                                <option value="pelicula">Películas</option>
                                <option value="serie">Series</option>
                            </select>
                        </label>
                    )}

                    {tipoConsulta === 'genero' && (
                        <label>
                            Género
                            <select value={genero} onChange={e => setGenero(e.target.value)}>
                                {GENEROS.map(g => <option key={g}>{g}</option>)}
                            </select>
                        </label>
                    )}

                    {tipoConsulta === 'anios' && (
                        <>
                            <label>
                                Desde
                                <input type="number" value={desde}
                                    onChange={e => setDesde(e.target.value)} />
                            </label>
                            <label>
                                Hasta
                                <input type="number" value={hasta}
                                    onChange={e => setHasta(e.target.value)} />
                            </label>
                        </>
                    )}

                    {tipoConsulta === 'disponibles' && (
                        <p className="filtros__nota">
                            Títulos disponibles, del mejor al peor calificado.
                        </p>
                    )}

                    <button type="submit" className="boton-principal" disabled={cargando}>
                        {cargando ? 'Consultando...' : 'Buscar'}
                    </button>
                </div>
            </form>

            <main aria-live="polite">

                {error && <p className="aviso aviso--error">{error}</p>}

                {!error && titulos.length === 0 && (
                    <p className="aviso">
                        {cargando
                            ? 'Cargando títulos...'
                            : consulta
                            ? 'No se encontraron títulos con ese filtro.'
                            : 'Presione "Buscar" para ver resultados.'}
                    </p>
                )}

                <ul className="rejilla">
                    {titulos.map(item => (
                        <li key={item.id} className={`ficha ficha--${item.tipo}`}>

                            <div className="ficha__encabezado">
                                <span className="ficha__tipo">
                                    {item.tipo === 'pelicula' ? 'Película' : 'Serie'}
                                </span>
                                <span className="ficha__nota" title="Calificación sobre 10">
                                    ★ {item.calificacion.toFixed(1)}
                                </span>
                            </div>

                            <h2>{item.titulo}</h2>
                            <p className="ficha__resumen">{item.anio} · {item.genero}</p>

                            <dl>
                                <dt>{item.tipo === 'pelicula' ? 'Dirección' : 'Creación'}</dt>
                                <dd>{item.detalles.creador}</dd>
                                <dt>Origen</dt>
                                <dd>{item.detalles.pais} ({item.detalles.idioma})</dd>
                                <dt>Duración</dt>
                                <dd>
                                    {item.detalles.duracionMin} min
                                    {item.tipo === 'serie' &&
                                        ` por episodio · Temporadas: ${item.detalles.temporadas}`}
                                </dd>
                            </dl>

                            <span className={item.disponible ? 'estado estado--si' : 'estado'}>
                                {item.disponible ? 'Disponible' : 'No disponible'}
                            </span>
                        </li>
                    ))}
                </ul>
            </main>

            <nav className="paginacion" aria-label="Paginación">
                <button type="button" onClick={irAnterior}
                    disabled={cargando || !consulta || numeroPagina === 0}>
                    ← Anterior
                </button>
                <span>Página {numeroPagina + 1}</span>
                <button type="button" onClick={irSiguiente}
                    disabled={cargando || !consulta || !haySiguiente}>
                    Siguiente →
                </button>
            </nav>
        </div>
    );
}

export default ConsultaTitulos;