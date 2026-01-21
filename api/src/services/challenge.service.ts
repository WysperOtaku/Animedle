import { getDiaId, getRetoDaily } from "../models/challenge.model";

export const getRetosDaily = async () => {
    const diaid = await getDiaId();
    return await getRetoDaily(parseInt(diaid[0]?.id));
}

export const getRetoHistory = async (limit: number) => {

}