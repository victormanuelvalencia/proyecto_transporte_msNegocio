import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Driver from './Driver'
import Facture from './Facture'
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
  public service_id:number

  @column()
  public driver_id:number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Service, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>
/*
  @belongsTo(() => Hotel, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'hotel_id'
  })
  public hotel: BelongsTo<typeof Hotel>

  @belongsTo(() => Restaurant, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'restaurant_id'
  })
  public restaurant: BelongsTo<typeof Restaurant>
*/
  @belongsTo(() => Driver, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'driver_id'
  })
  public driver: BelongsTo<typeof Driver>

  @hasOne(() => Facture, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'expense_id'
  })
  public facture: HasOne<typeof Facture>
}
