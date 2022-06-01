import { Schema, model } from 'mongoose';

const guildSchema = new Schema({
    id: String,
    members: [
        {
            id: String,
            experience: Number
        }
    ]
})

export const server = model('guilds', guildSchema);