import Driver from './Driver';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import OwnerVehicle from './OwnerVehicle';


export default class Owner extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public user_id: string 

  @column()
  public driver_id: number // Clave foránea de la relación con 'drivers'

  @column()
  public rating: number

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'owner_id',
  })
  public ownerVehicle: HasMany<typeof OwnerVehicle>;

 
  // Relación con 'drivers'
  @belongsTo(() => Driver, { // 'owner' pertenece a 'driver'
    foreignKey: 'driver_id', // Establece la clave foránea en la tabla 'drivers'
  })
  public driver: BelongsTo<typeof Driver>;
}
