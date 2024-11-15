import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Expense from './Expense'
import Fee from './Fee'

export default class Facture extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public amount: number

  @column()
  public date: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Expense, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'expense_id'
  })
  public expense: BelongsTo<typeof Expense>

  @belongsTo(() => Fee, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'fee_id'
  })
  public fee: BelongsTo<typeof Fee>
}
