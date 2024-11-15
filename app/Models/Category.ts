import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import CategoryProduct from './CategoryProduct'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Category, {
    foreignKey: 'parentId',
  })
  public category: HasMany<typeof Category>;

  @hasMany(() => CategoryProduct, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'category_id'
  })
  public categoryProduct: HasMany<typeof CategoryProduct>
}
