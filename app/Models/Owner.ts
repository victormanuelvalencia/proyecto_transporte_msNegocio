import Driver from './Driver';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import OwnerVehicle from './OwnerVehicle';
import User from './User';

export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: number // Clave foránea de la relación con 'users'

  @column()
  public driver_id: number // Clave foránea de la relación con 'drivers'

  @column()
  public rating: number

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'owner_id',
  })
  public ownerVehicle: HasMany<typeof OwnerVehicle>;

  // Relación con 'users'
  @belongsTo(() => User, { // 'driver' pertenece a 'user'
    foreignKey: 'user_id', // Establece la clave foránea en la tabla 'users'
  })
  public user: BelongsTo<typeof User>;

  // Relación con 'drivers'
  @belongsTo(() => Driver, { // 'owner' pertenece a 'driver'
    foreignKey: 'driver_id', // Establece la clave foránea en la tabla 'drivers'
  })
  public driver: BelongsTo<typeof Driver>;
}
