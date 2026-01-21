import { getDiaId, getDiaIdsByDate, getRetoByDay, getRetoDaily, getRetosByIds } from "../models/challenge.model";

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