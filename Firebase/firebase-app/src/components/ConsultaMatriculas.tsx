
import { useState } from 'react';

import {
    type Matricula,
    obtenerCursosPorEstudiante,
    obtenerEstudiantesPorCurso,
    obtenerMatriculasActivas,
    obtenerMatriculaPorId
} from '../services/matriculaService';

function ConsultaMatriculas() {

    const [tipoConsulta, setTipoConsulta] = useState('estudiante');
    const [identificador, setIdentificador] = useState('');

    const [matriculas, setMatriculas] = useState<Matricula[]>([]);
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const ejecutarConsulta = async () => {

        setError('');
        setMatriculas([]);
        setCargando(true);

        try {

            let resultado: Matricula[] = [];

            switch (tipoConsulta) {

                // 1. Cursos de un estudiante
                case 'estudiante':
                    if (!identificador.trim()) {
                        throw new Error('Ingrese el ID del estudiante');
                    }

                    resultado = await obtenerCursosPorEstudiante(
                        identificador.trim()
                    );
                    break;

                // 2. Estudiantes de un curso
                case 'curso':
                    if (!identificador.trim()) {
                        throw new Error('Ingrese el ID del curso');
                    }

                    resultado = await obtenerEstudiantesPorCurso(
                        identificador.trim()
                    );
                    break;

                // 3. Matrículas activas
                case 'activas':
                    resultado = await obtenerMatriculasActivas();
                    break;

                // 4. Matrícula por ID
                case 'matricula':
                    if (!identificador.trim()) {
                        throw new Error('Ingrese el ID de la matrícula');
                    }

                    const matricula = await obtenerMatriculaPorId(
                        identificador.trim()
                    );

                    resultado = matricula ? [matricula] : [];
                    break;
            }

            setMatriculas(resultado);

        } catch (err) {

            console.error('Error en la consulta:', err);

            setError(
                err instanceof Error
                    ? err.message
                    : 'Error al consultar Firestore'
            );

        } finally {
            setCargando(false);
        }
    };

    return (
        <div>

            <h2>Consultas de Matrículas</h2>

            <div>
                <label>Tipo de consulta: </label>

                <select
                    value={tipoConsulta}
                    onChange={(e) => {
                        setTipoConsulta(e.target.value);
                        setIdentificador('');
                        setMatriculas([]);
                        setError('');
                    }}
                >
                    <option value="estudiante">
                        Cursos de un estudiante
                    </option>

                    <option value="curso">
                        Estudiantes de un curso
                    </option>

                    <option value="activas">
                        Matrículas activas
                    </option>

                    <option value="matricula">
                        Matrícula por ID
                    </option>

                </select>
            </div>

            {tipoConsulta !== 'activas' && (
                <div>
                    <label>
                        {tipoConsulta === 'estudiante'
                            ? 'ID del estudiante:'
                            : tipoConsulta === 'curso'
                            ? 'ID del curso:'
                            : 'ID de la matrícula:'}
                    </label>

                    <input
                        type="text"
                        value={identificador}
                        onChange={(e) => setIdentificador(e.target.value)}
                        placeholder="Ingrese el identificador"
                    />
                </div>
            )}

            <br />

            <button
                onClick={ejecutarConsulta}
                disabled={cargando}
            >
                {cargando ? 'Consultando...' : 'Ejecutar consulta'}
            </button>

            <br />
            <br />

            {error && (
                <p>{error}</p>
            )}

            <h3>Resultados: {matriculas.length}</h3>

            <table border={1} cellPadding={8} cellSpacing={0}>

                <thead>
                    <tr>
                        <th>ID Matrícula</th>
                        <th>ID Estudiante</th>
                        <th>Estudiante</th>
                        <th>ID Curso</th>
                        <th>Curso</th>
                        <th>Estado</th>
                        <th>Periodo</th>
                    </tr>
                </thead>

                <tbody>

                    {matriculas.length > 0 ? (

                        matriculas.map((matricula) => (

                            <tr key={matricula.id}>

                                <td>{matricula.id}</td>
                                <td>{matricula.estudiantesID}</td>
                                <td>{matricula.estudianteNombre}</td>
                                <td>{matricula.cursoID}</td>
                                <td>{matricula.cursoNombre}</td>
                                <td>{matricula.estado}</td>
                                <td>{matricula.periodo}</td>

                            </tr>

                        ))

                    ) : (

                        <tr>
                            <td colSpan={7}>
                                No hay resultados para mostrar.
                            </td>
                        </tr>

                    )}

                </tbody>

            </table>

        </div>
    );
}

export default ConsultaMatriculas;
