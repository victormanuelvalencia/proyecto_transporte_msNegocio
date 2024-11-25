import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Municipality from './Municipality'

export default class Restriction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public description: String
  

  @column()
  public start_date: Date

  @column()
  public end_date: Date

  @column()
  public municipality_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Municipality, {
    foreignKey: 'municipality_id',
  })
  public municipality: BelongsTo<typeof Municipality>;
}