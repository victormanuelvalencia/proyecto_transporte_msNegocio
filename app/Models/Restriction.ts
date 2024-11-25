import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'

export default class Restriction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: string

  @column()
  public startDate: Date

  @column()
  public endDate: Date

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
