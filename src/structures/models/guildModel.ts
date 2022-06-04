import { Schema, model } from 'mongoose';

const guildSchema = new Schema({
    id: String,
    members: [
        {
            id: String,
            exp: Number,
            level: Number,
        }
    ],
    blacklist: {
        channels: [],
        users: []
    }
})

export const server = model('guilds', guildSchema);