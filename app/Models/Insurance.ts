import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Vehicle from './Vehicle';

export default class Insurance extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public policy_number: string;

  @column()
  public provider: string;

  @column()
  public expiration_date: Date;

  @column()
  public vehicle_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id',
  })
  public vehicle: BelongsTo<typeof Vehicle>;
}
