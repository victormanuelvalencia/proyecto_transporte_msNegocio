import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Company from './Company'
import Customer from './Customer';

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

  @column()
  public customer_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Company, {
    foreignKey: 'company_id'
  })
  public company: BelongsTo<typeof Company>

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'
  })
  public customer: BelongsTo<typeof Customer>
}
