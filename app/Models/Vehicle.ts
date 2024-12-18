import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Operation from './Operation'
import OwnerVehicle from './OwnerVehicle'
import DriverVehicle from './DriverVehicle'
import Insurance from './Insurance'
import Rute from './Rute'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public license_plate: string

  @column()
  public type_vehicle: string

  @hasMany(() => Insurance, {
    foreignKey: 'vehicle_id',  // Establece la relación de clave foránea
  })
  public insurance: HasMany<typeof Insurance>

  @hasMany(() => Operation, {
    foreignKey: 'vehicle_id'
  })
  public operation: HasMany<typeof Operation>

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'vehicle_id',
  })
  public ownerVehicle: HasMany<typeof OwnerVehicle>;

  @hasMany(() => DriverVehicle, {
    foreignKey: 'vehicle_id'
  })
  public driverVehicle: HasMany<typeof DriverVehicle>

  @hasMany(() => Rute, {
    foreignKey: 'vehicle_id'
  })
  public rute: HasMany<typeof Rute>
}
