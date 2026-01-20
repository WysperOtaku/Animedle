import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const getRetoDaily = async () => {
    const diaId = await pool.query(
        `SELECT 'id'
            FROM 'tabla de dia'
        WHERE 'fecha' == $1`,
        [new Date().toISOString().split('T')[0]]
    );

    const result = await pool.query(
        `SELECT *
            FROM 'tabla de retos'
        WHERE 'dia id' == $1`,
        [diaId]
    );

    return result.rows;
}

const getRetosByLimit = async (limit: number) => {
    /**
     * Mirar la fecha de hoy y tirar X retos atras
     * Tener un array de los dayId de los retos
     * Hacer una consulta a los retos con un IN para cojer los retos que estan en esos dayId
     * Los datos recojidos de la base de datos seran: fecha, retoId
     */
    const dayIds = await pool.query(
        `SELECT 'dayId'
            FROM 'tabla de dia'
        WHERE 'fecha' <= $1
        ORDER BY fecha DESC
        LIMIT $2`,
        [new Date().toISOString().split('T')[0], limit]
    );

    const dayIdsStr = "";
    //Transformar el dato dayIds a un string con formato asi '1,2,3,4,5'

    const result = await pool.query(
        `SELECT 'fecha', 'retoId'
            FROM 'tabla de retos' r
            INNER JOIN 'tabla de dia' d on r.id = d.id
        WHERE d.fecha IN($1)`,
        [dayIdsStr]
    );

    return result.rows;
}

const getRetoByDay = async (day: number) => {
    const result = await pool.query(
        `SELECT *
            FROM 'tabla de retos'
        WHERE 'dia id' == $1`,
        [day]
    );

    return result.rows;
}

// EN LA CAPA DE SERVICE HACE FALTA JSEND PARA FORMATAR LOS OBJETOS JS A JSON