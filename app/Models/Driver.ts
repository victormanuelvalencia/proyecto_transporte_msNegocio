import Expense from './Expense';
import DriverVehicle from './DriverVehicle';
import Shift from './Shift';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';


export default class Driver extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public license_number: string; // Atributo específico para conductores
  
  @column()
  public license_expiry: Date

  @column()
  public user_id:string // El user_id que vamos a necesitar para conectarlo con el user del ms de seguridad

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

}