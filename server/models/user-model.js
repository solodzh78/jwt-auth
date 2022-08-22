import mongoose  from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    email: { type: String, unique: true, requared: true },
    password: { type: String, requared: true },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
});

export default model('User', UserSchema);
