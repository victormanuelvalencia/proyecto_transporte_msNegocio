import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Vehicle from './Vehicle'
import Municipality from './Municipality'

export default class Operation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: Date

  @column()
  public operation_type: string
  
  @column()
  public state: boolean

  @column()
  public municipality_id: number

  @column()
  public vehicle_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Vehicle, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'vehicle_id'
  })
  public vehicle: BelongsTo<typeof Vehicle>

  @belongsTo(() => Municipality, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'municipality_id'
  })
  public municipality: BelongsTo<typeof Municipality>
}
