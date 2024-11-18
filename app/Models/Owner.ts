import Driver from './Driver';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
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
 
  @hasMany(() => Expense, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'driver_id'
  })
  public expense: HasMany<typeof Expense>

}