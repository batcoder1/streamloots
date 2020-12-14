import { Schema, model, Document } from 'mongoose';
import { cardTypeEnum, raretyCardEnum } from '../../../config/constant';
import Card from '../../core/entities/Card';
export interface ICardDoc extends Document, Card {
  id: string;
}

const CardSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
      enum: cardTypeEnum,
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
    userId: {
      type: String,
    },
  },
  { collection: 'Cards', timestamps: false },
);

CardSchema.set('toJSON', {
  virtuals: true,
  transform: (doc: any, ret: any) => {
    delete ret._id;
    delete ret.updatedAt;
    delete ret.createdAt;
    delete ret.__v;

    return ret;
  },
});
const CardModel = model<ICardDoc>('cards', CardSchema);
export default CardModel;
