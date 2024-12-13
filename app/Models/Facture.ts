import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Expense from './Expense'
import Fee from './Fee'

export default class Facture extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public card_number:string
  
  @column()
  public exp_year:string
  
  @column()
  public exp_month:string

  @column()
  public cvc:string

  @column()
  public name:string

  @column()
  public last_name:string

  @column()
  public email:string
  
  @column()
  public phone:string
  
  @column()
  public doc_number:string

  @column()
  public city:string

  @column()
  public address:string

  @column()
  public cell_phone:string

  @column()
  public bill:string

  @column()
  public value:string

  @column()
  public expense_id:number

  @column()
  public fee_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Expense, {
    foreignKey: 'expense_id'
  })
  public expense: BelongsTo<typeof Expense>

  @belongsTo(() => Fee, {
    foreignKey: 'fee_id'
  })
  public fee: BelongsTo<typeof Fee>
}
