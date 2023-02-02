import { model, Schema, Document } from 'mongoose';
import { User } from './interface/user.interface';

const userSchema: Schema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true
  },
},

  {
    timestamps: true
  }
);

const userModel = model<User>('User', userSchema);

export default userModel;
