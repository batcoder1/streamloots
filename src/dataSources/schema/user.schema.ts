import { Document, model, Schema } from 'mongoose';
import User from '../../core/entities/User';
export interface IUserDoc extends Document, User {
  id: string;
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    surname: {
      type: String,
    },
    email: {
      type: String,
    },
    balance: {
      type: Number,
      default: 0,
    },
    birthDate: {
      type: Date,
    },
  },
  { collection: 'Users', timestamps: false },
);

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc: any, ret: any): any => {
    /* eslint no-underscore-dangle: ["error", { "allow": ["_id", "__v"] }]*/
    delete ret._id;
    delete ret.updatedAt;
    delete ret.createdAt;
    delete ret.__v;

    return ret as Record<string, unknown>;
  },
});
const userModel = model<IUserDoc>('users', userSchema);
export default userModel;
