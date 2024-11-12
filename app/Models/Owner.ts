import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import OwnerVehicle from './OwnerVehicle';

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public phoneNumber: string;

  @column()
  public address: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'owner_id',
  })
  public ownerVehicles: HasMany<typeof OwnerVehicle>;
}
