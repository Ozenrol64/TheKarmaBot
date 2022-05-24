import { Schema, model } from 'mongoose';

const guildSchema = new Schema({
    id: String,
    members: [
        {
            id: String,
            level: Number
        }
    ]
})

export const server = model('guilds', guildSchema);