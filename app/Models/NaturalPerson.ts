import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Company from './Company'

export default class NaturalPerson extends BaseModel {
  public static table = 'natural_persons';

  @column({ isPrimary: true })
  public id: number

  @column()
  public document_type: string

  @column()
  public document_number: string

  @column()
  public company_id: number 

  @column()
  public user_id:string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Company, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'company_id'
  })
  public company: BelongsTo<typeof Company>
}
