import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Vehicle from './Vehicle';

export default class Insurance extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public policyNumber: string;

  @column()
  public provider: string;

  @column()
  public expirationDate: Date;

  @column()
  public vehicleId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicleId',
  })
  public vehicle: BelongsTo<typeof Vehicle>;
}
