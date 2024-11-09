import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'

export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:String

  @column()
  public zip_code:number

  @column()
  public department_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Department, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'department_id'
  })
  public department: BelongsTo<typeof Department>
}
