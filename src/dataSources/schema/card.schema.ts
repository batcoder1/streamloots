import { Document, model, Schema } from 'mongoose';
import { raretyCardEnum } from '../../../config/constant';
import Card from '../../core/entities/Card';
export interface ICardDoc extends Document, Card {
  id: string;
}

const cardSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    rarity: {
      type: String,
      enum: raretyCardEnum,
    },
    published: {
      type: Boolean,
      default: false,
    },
    // limited value = 0 => is a regular card
    limited: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
    },
  },
  { collection: 'Cards', timestamps: false },
);

cardSchema.set('toJSON', {
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
const cardModel = model<ICardDoc>('cards', cardSchema);
export default cardModel;
