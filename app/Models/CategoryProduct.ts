import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Product from './Product'

export default class CategoryProduct extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category_id: number

  @column()
  public product_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Category, {
    //nombre de la clave foranea que permite la relacion, que hace referencia a la que creamos previamente
    foreignKey: 'category_id'
  })
  public category: BelongsTo<typeof Category>

  @belongsTo(() => Product, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'product_id'
  })
  public product: BelongsTo<typeof Product>
}
