import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'

export default class Shift extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public driver_id: number

  @column()
  public start_time: string

  @column()
  public end_time: string

  @column()
  public date: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // Relación con el conductor
  @belongsTo(() => Driver)
  public driver: BelongsTo<typeof Driver>
}

