import DriverVehicle from './DriverVehicle';
import Shift from './Shift';
import User from './User';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public license_number: string; // Atributo específico para conductores

  @column()
  public user_id: number // Clave foránea de la relación con 'users'

  // Relación con 'users'
  @belongsTo(() => User, { // 'driver' pertenece a 'user'
    foreignKey: 'user_id', // Establece la clave foránea en la tabla 'users'
  })
  public user: BelongsTo<typeof User>;
  
  // Relación con turnos (uno a muchos)
  @hasMany(() => Shift, {
    foreignKey: 'driver_id'
  })
  public shifts: HasMany<typeof Shift>

  @hasMany(() => DriverVehicle, {
    foreignKey: 'driver_id'
  })
  public driverVehicle: HasMany<typeof DriverVehicle>

}