
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import OwnerVehicle from './OwnerVehicle';
import DriverVehicle from './DriverVehicle';
import Expense from './Expense';
import Shift from './Shift';


export default class Owner extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number;
  
  @column()
  public license_number: string; // Atributo específico para conductores
  
  @column()
  public license_expiry: Date
  
  @column()
  public rating: number

  @column()
  public user_id:string // El user_id que vamos a necesitar para conectarlo con el user del ms de seguridad

  // Relación con turnos (uno a muchos)
  @hasMany(() => Shift, {
    foreignKey: 'owner_id'
  })
  public shift: HasMany<typeof Shift>

  @hasMany(() => Expense, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'owner_id'
  })
  public expense: HasMany<typeof Expense>

  @hasMany(() => DriverVehicle, {
    foreignKey: 'owner_id'
  })
  public driverVehicle: HasMany<typeof DriverVehicle>

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'owner_id',
  })
  public ownerVehicle: HasMany<typeof OwnerVehicle>;
}