import { DateTime } from 'luxon'
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

  @column()
  public max_load_capacity: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Operation, {
    foreignKey: 'vehicle_id'
  })
  public operation: HasMany<typeof Operation>

  @hasMany(() => OwnerVehicle, {
    foreignKey: 'vehicle_id',
  })
  public ownerVehicle: HasMany<typeof OwnerVehicle>;

  @hasMany(() => Insurance, {
    foreignKey: 'vehicle_id',
  })
  public insurance: HasMany<typeof Insurance>;

  @hasMany(() => DriverVehicle, {
    foreignKey: 'vehicle_id'
  })
  public driverVehicle: HasMany<typeof DriverVehicle>

  @hasMany(() => Rute, {
    foreignKey: 'vehicle_id'
  })
  public rute: HasMany<typeof Rute>
}
