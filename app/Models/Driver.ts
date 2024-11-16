import Expense from './Expense';
import DriverVehicle from './DriverVehicle';
import Shift from './Shift';
import User from './User';
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import Owner from './Owner';

export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public license_number: string; // Atributo específico para conductores

  @column()
  public user_id: number // Clave foránea de la relación con 'users'

  @column()
  public license_expiry: Date

  // Relación con 'users'
  @belongsTo(() => User, { // 'driver' pertenece a 'user'
    foreignKey: 'user_id', // Establece la clave foránea en la tabla 'users'
  })
  public user: BelongsTo<typeof User>;
  
  // Relación con turnos (uno a muchos)
  @hasMany(() => Shift, {
    foreignKey: 'driver_id'
  })
  public shift: HasMany<typeof Shift>

  @hasMany(() => Expense, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'driver_id'
  })
  public expense: HasMany<typeof Expense>

  @hasMany(() => DriverVehicle, {
    foreignKey: 'driver_id'
  })
  public driverVehicle: HasMany<typeof DriverVehicle>

  // Relación con 'owners'
  @hasOne(() => Owner, { // 'owner' tiene un 'driver'
    foreignKey: 'driver_id', // Establece la clave foránea en la tabla 'owners'
  })
  public owner: HasOne<typeof Owner>;

}