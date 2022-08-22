import { Schema, model} from 'mongoose';

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, requared: true},
    isActivaited: {type: Boolean, default: false},
    activationLink: {type: String},
});

export default model('User', UserSchema);
