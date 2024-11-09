import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'

export default class Department extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:String

  @column()
  public zip_code:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Municipality, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'theater_id'
  })
  public municipality: HasMany<typeof Municipality>
}
