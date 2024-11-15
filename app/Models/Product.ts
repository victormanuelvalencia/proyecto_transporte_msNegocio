import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoryProduct from './CategoryProduct'
import Lot from './Lot'
import Customer from './Customer'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public weight: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => CategoryProduct, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'product_id'
  })
  public categoryProduct: HasMany<typeof CategoryProduct>

  @belongsTo(() => Lot, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'lot_id'
  })
  public lot: BelongsTo<typeof Lot>

  @belongsTo(() => Customer, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'customer_id'
  })
  public customer: BelongsTo<typeof Customer>
}
