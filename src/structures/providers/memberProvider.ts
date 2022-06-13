import { RPGmember } from "../models/memberModel";
import type { GuildMember } from "discord.js";


export async function getRPGMember(member: GuildMember) {
    const data = await RPGmember.findOne(member);
    if (data) return data;
}

export async function updateRPGMember(member: GuildMember, settings: any) {
    let data = await getRPGMember(member);
    if (typeof data !== 'object') data = {}
    for (const key in settings) {
        if (data[key] !== settings[key]) data[key] = settings[key]
    }
    return data.updateOne(settings);
}
