import { pool } from "./dbconnection";

export const getDiaId = async () => {
    const result = await pool.query(
        `SELECT id
            FROM dias
        WHERE fecha = CURRENT_DATE`
    );

    return result.rows;
}

export const getRetoDaily = async (diaId: number) => {
    const result = await pool.query(
        `SELECT
            r.id,
            a.name,
            d.fecha,
            t.nombre,
            CASE t.nombre
                WHEN 'emoji' THEN json_build_object('emoji', re.emojis)
                WHEN 'opening' THEN json_build_object('opening_url', ro.opening_url)
                WHEN 'personaje' THEN json_build_object('personaje', rp.img_url)
                WHEN 'imagenes' THEN json_build_object(
                'very_easy', ri.very_easy_url,
                'easy', ri.easy_url,
                'medium', ri.medium_url,
                'hard', ri.hard_url
                )
            END AS datos
            FROM retos r
            LEFT JOIN retos_emojis re ON r.id = re.id
            LEFT JOIN retos_openings ro ON r.id = ro.id
            LEFT JOIN retos_personajes rp ON r.id = rp.id
            LEFT JOIN retos_imagenes ri ON r.id = ri.id
            JOIN tipos t ON r.tipo_id = t.id
            JOIN animes a ON r.anime_id = a.id
            JOIN dias d ON r.dia_id = d.id
        WHERE r.dia_id = $1;
        `,
        [diaId]
    );

    return result.rows;
}

export const getDiaIdsByDate = async (limit: number) => {
    const result = await pool.query(
        `SELECT id
            FROM dias
        WHERE fecha <= CURRENT_DATE
        ORDER BY fecha DESC
        LIMIT $1`,
        [limit]
    );

    return result.rows;
}

export const getRetosByIds = async (dayIds: Array<number>) => {
    const result = await pool.query(
        `SELECT r.id, d.fecha
            FROM retos r
            INNER JOIN dias d on r.dia_id = d.id
        WHERE d.id = ANY($1)`,
        [dayIds]
    );

    return result.rows;
}

export const getRetoByDay = async (date: string) => {
    const result = await pool.query(
        `SELECT
            r.id,
            a.name,
            d.fecha,
            t.nombre,
            CASE t.nombre
                WHEN 'emoji' THEN json_build_object('emoji', re.emojis)
                WHEN 'opening' THEN json_build_object('opening_url', ro.opening_url)
                WHEN 'personaje' THEN json_build_object('personaje', rp.img_url)
                WHEN 'imagenes' THEN json_build_object(
                'very_easy', ri.very_easy_url,
                'easy', ri.easy_url,
                'medium', ri.medium_url,
                'hard', ri.hard_url
                )
            END AS datos
            FROM retos r
            LEFT JOIN retos_emojis re ON r.id = re.id
            LEFT JOIN retos_openings ro ON r.id = ro.id
            LEFT JOIN retos_personajes rp ON r.id = rp.id
            LEFT JOIN retos_imagenes ri ON r.id = ri.id
            JOIN tipos t ON r.tipo_id = t.id
            JOIN animes a ON r.anime_id = a.id
            JOIN dias d ON r.dia_id = d.id
        WHERE d.fecha = $1;
        `,
        [date]
    );

    return result.rows;
}

// EN LA CAPA DE SERVICE HACE FALTA JSEND PARA FORMATAR LOS OBJETOS JS A JSON