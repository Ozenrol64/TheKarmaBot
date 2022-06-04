import { Schema, model } from 'mongoose';

const moderationSchema = new Schema({
    id: { type: Number, default: 1 },
    blacklist: {
      guild: [],
      users: []
    }
})

export const Moderation = model('moderation', moderationSchema);