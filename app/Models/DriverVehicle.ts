import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import Vehicle from './Vehicle';
import Driver from './Driver';
import Owner from './Owner';

export default class DriverVehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public driver_id: number;
  
  @column()
  public owner_id: number;

  @column()
  public vehicle_id: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id',
  })
  public driver: BelongsTo<typeof Driver>;

  @belongsTo(() => Owner, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'owner_id'
  })
  public owner: BelongsTo<typeof Owner>

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id',
  })
  public vehicle: BelongsTo<typeof Vehicle>;
}