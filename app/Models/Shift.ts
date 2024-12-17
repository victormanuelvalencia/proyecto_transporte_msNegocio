import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Owner from './Owner'
import Driver from './Driver'

export default class Shift extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public driver_id: number
  
  @column()
  public owner_id: number

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

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id',
  })
  public driver: BelongsTo<typeof Driver>;

  @belongsTo(() => Owner, {
    foreignKey: 'owner_id'
  })
  public owner: BelongsTo<typeof Owner>
}