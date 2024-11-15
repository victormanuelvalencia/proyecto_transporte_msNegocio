import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import NaturalPerson from './NaturalPerson'

export default class Company extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public nit: string

  @column()
  public contact: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => NaturalPerson, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'company_id'
  })
  public naturalPerson: HasOne<typeof NaturalPerson>
}
