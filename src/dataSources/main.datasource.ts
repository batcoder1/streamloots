import mongoose, { UpdateQuery } from 'mongoose';
import MainRepository from '../core/repositories/main.repository';
import { logger } from '../share/util/logger';
import { IUserDoc } from './schema/user.schema';
import { ICardDoc } from './schema/card.schema';
import config from 'config';

let MONGO_CONNECTION: string;
let MONGO_USERNAME: string;
let MONGO_HOST: string;
let MONGO_PASSWORD: string;
let MONGO_DB: string;
let MONGO_PARAMS: string;
const nodeEnv = process.env.NODE_ENV;

export class MainDatasource<T extends ICardDoc | IUserDoc>
  implements MainRepository<T> {
  private model: mongoose.Model<T>;

  constructor(schemaModel: mongoose.Model<T>) {
    this.model = schemaModel;
    this.setEnv();
    void this.connectToDatabase();
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
  /**
   * Set env
   *
   */
  private setEnv() {
    //
    // Add NODE_ENV to path if is not production
    MONGO_CONNECTION = config.get('MONGO.CONNECTION');
    MONGO_USERNAME = encodeURIComponent(config.get('MONGO.USERNAME'));
    MONGO_HOST = config.get('MONGO.HOST');
    MONGO_PASSWORD = encodeURIComponent(config.get('MONGO.PASSWORD'));
    MONGO_DB = config.get('MONGO.DB');
    MONGO_PARAMS = config.get('MONGO.PARAMS');
  }

  /**
   * Connect to mongo
   */
  private async connectToDatabase() {
    const MONGO_URI = `${MONGO_CONNECTION}://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}-${nodeEnv}${MONGO_PARAMS}`;
    const options = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    try {
      await mongoose.connect(MONGO_URI, options);
      logger.info('Mongo: connected succesfully!!!');
    } catch (error) {
      logger.error(`Mongo: Could not connect to the database. Error: ${error}`);
      process.exit(1);
    }
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
