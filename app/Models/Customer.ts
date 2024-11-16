import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Contract from './Contract'
import Product from './Product'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public address: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Contract, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'customer_id'
  })
  public contract: HasMany<typeof Contract>

  @hasMany(() => Product, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'customer_id'
  })
  public product: HasMany<typeof Product>
}
