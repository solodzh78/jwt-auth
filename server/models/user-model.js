import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: { type: String, unique: true, requared: true },
    password: { type: String, requared: true },
    isActivaited: { type: Boolean, default: false },
    activationLink: { type: String },
});

export default model('User', UserSchema);
