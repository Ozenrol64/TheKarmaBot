import { Schema, model } from 'mongoose';

const guildSchema = new Schema({
    id: String,
    members: Array
})

export const server = model('guilds', guildSchema);