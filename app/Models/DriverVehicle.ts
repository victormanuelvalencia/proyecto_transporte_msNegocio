import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Vehicle from './Vehicle';
import Driver from './Driver';

export default class DriverVehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public driver_id: number;

  @column()
  public vehicle_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id',
  })
  public owner: BelongsTo<typeof Driver>;

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id',
  })
  public vehicle: BelongsTo<typeof Vehicle>;
}