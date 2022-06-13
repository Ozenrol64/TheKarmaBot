import { Schema, model } from 'mongoose';

const memberSchema = new Schema({
    id: String,
})

export const RPGmember = model('members', memberSchema);