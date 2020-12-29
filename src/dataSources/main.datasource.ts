import mongoose, { UpdateQuery } from 'mongoose';
import MainRepository from '../core/repositories/main.repository';
import { logger } from '../share/util/logger';
import { IUserDoc } from './schema/user.schema';
import { ICardDoc } from './schema/card.schema';

export class MainDatasource<T extends ICardDoc | IUserDoc>
  implements MainRepository<T> {
  private model: mongoose.Model<T>;

  constructor(schemaModel: mongoose.Model<T>) {
    this.model = schemaModel;
  }

  /**
   * Create new element
   *
   * @param {T} item
   * @returns {Promise<T>}
   * @memberof MainDatasource
   */
  public async create(item: T): Promise<T> {
    return await this.model.create(item);
  }

  /**
   * Get element by id
   *
   * @param {string} userId
   * @returns {Promise<Card[]>}
   * @memberof CardDatasource
   */
  public async getById(id: string): Promise<T> {
    logger.info('getById...');
    const element = await this.model.findById(id);
    return element;
  }

  /**
   * Get all elements
   *
   * @returns {Promise<Card[]>}
   * @memberof CardDatasource
   */
  public async getAll(): Promise<T[]> {
    logger.info('getCards...');
    const elements = await this.model.find({});

    return elements;
  }

  /**
   * Update a card
   *
   * @param {Card} card
   * @returns {Promise<Card>}0
   * @memberof CardDatasource
   */
  public async update(id: string, item: T): Promise<T> {
    logger.info('updateCard...');

    const itemWihPropertiesNotNull = deleteUndefinedProperties(item);

    await this.model.findByIdAndUpdate(id, ({
      $set: itemWihPropertiesNotNull,
    } as unknown) as UpdateQuery<T>);

    return await this.model.findById(id);
  }
}

export const createMainDatasource = (
  schemaModel: mongoose.Model<ICardDoc | IUserDoc>,
): MainDatasource<ICardDoc | IUserDoc> => {
  return new MainDatasource(schemaModel);
};

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
function deleteUndefinedProperties<T>(obj: T): any {
  return JSON.parse(JSON.stringify(obj)) as Record<string, unknown>;
}
