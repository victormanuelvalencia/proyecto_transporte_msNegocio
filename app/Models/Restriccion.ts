import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'

export default class Restriccion extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public descripcion:string

  @column()
  public fecha_inicio:Date

  @column()
  public fecha_fin: Date

  @column()
  public municipality_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Municipality, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'municipality_id'
  })
  public municipality: BelongsTo<typeof Municipality>
}
