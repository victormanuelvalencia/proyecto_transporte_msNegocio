import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Hotel from './Hotel'
import Restaurant from './Restaurant'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public phone_number:string

  @column()
  public active:boolean
  
  @column()
  public hotel_id:number
  
  @column()
  public restaurant_id:number

  @column()
  public user_id:string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Hotel, {
    foreignKey: 'hotel_id'
  })
  public hotel: BelongsTo<typeof Hotel>
  
  @belongsTo(() => Restaurant, {
    foreignKey: 'restaurant_id'
  })
  public restaurant: BelongsTo<typeof Restaurant>
}
