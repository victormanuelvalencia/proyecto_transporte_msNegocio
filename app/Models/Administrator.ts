import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class Administrator extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public phone_number:string

  @column()
  public active:boolean
  
  @column()
  public service_id:number

  @column()
  public user_id:string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Service, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'service_id'
  })
  public service: BelongsTo<typeof Service>
 
}
