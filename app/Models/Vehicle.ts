import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Operation from './Operation'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public license_plate: string

  @column()
  public type_vehicle: string

  @column()
  public max_load_capacity: number

  @column()

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Operation, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'vehicle_id'
  })
  public operation: HasMany<typeof Operation>
}
