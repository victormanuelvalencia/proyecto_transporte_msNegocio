import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Fee from './Fee'
import Customer from './Customer'
import Rute from './Rute'

export default class Contract extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public start_date: Date

  @column()
  public end_date: Date

  @column()
  public total_amount: number

  @column()
  public customer_id: number
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Fee, {
    foreignKey: 'contract_id'
  })
  public fee: HasMany<typeof Fee>

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id'
  })
  public customer: BelongsTo<typeof Customer>

  @hasMany(() => Rute, {
    foreignKey: 'contract_id'
  })
  public rute: HasMany<typeof Rute>
}
