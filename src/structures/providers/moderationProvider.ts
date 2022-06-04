import { Moderation } from "../models/moderationModel";


export async function getModeration() {
    const data = await Moderation.findOne({ id: 1 });
    if (data) return data;
}

export async function updateModeration(settings: any) {
    let data = await getModeration();
    if (typeof data !== 'object') data = {}
    for (const key in settings) {
        if (data[key] !== settings[key]) data[key] = settings[key]
    }
    return data.updateOne(settings);
}
