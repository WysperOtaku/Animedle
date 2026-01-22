import { getDiaId, getDiaIdsByDate, getRetoByDay, getRetoDaily, getRetosByIds } from "../models/challenge.model";

/**
 * Si el endpoint da un error de:
 *   - DataBase
 *   - BigInt
 * 
 * Es porque aun no hay datos,
 * pero esta perfecto y funcionara
 * cuando hayan datos
 */
export const getRetosDaily = async () => {
    const diaId = await getDiaId();
    return await getRetoDaily(parseInt(diaId[0]?.id));
}

export const getRetoHistory = async (limit: number) => {
    const diasIds = await getDiaIdsByDate(limit) as Array<number>;
    return await getRetosByIds(diasIds);
}

export const getRetoDay = async (date: string) => {
    return await getRetoByDay(date);
}