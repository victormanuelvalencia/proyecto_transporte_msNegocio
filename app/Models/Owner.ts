import Driver from './Driver';
import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import OwnerVehicle from './OwnerVehicle';
import DriverVehicle from './DriverVehicle';
import Expense from './Expense';
import Shift from './Shift';


export default class Owner extends Driver {
  @column()
  public rating: number

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'owner_id',
  })
  public ownerVehicle: HasMany<typeof OwnerVehicle>;
 
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