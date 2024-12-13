import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Driver from './Driver'
import Facture from './Facture'
import Owner from './Owner'
import Hotel from './Hotel'
import Restaurant from './Restaurant'

export default class Expense extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ammount:number

  @column()
  public description:string

  @column()
  public status:string

  @column()
  public hotel_id:number
  
  @column()
  public restaurant_id:number
  
  @column()
  public driver_id:number
  
  @column()
  public owner_id:number

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

  @belongsTo(() => Driver, {
    foreignKey: 'driver_id'
  })
  public driver: BelongsTo<typeof Driver>

  @belongsTo(() => Owner, {
    foreignKey: 'owner_id'
  })
  public owner: BelongsTo<typeof Owner>

  @hasOne(() => Facture, {
    foreignKey: 'expense_id'
  })
  public facture: HasOne<typeof Facture>
}
