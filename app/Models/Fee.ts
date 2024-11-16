import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Facture from './Facture'
import Contract from './Contract'

export default class Fee extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public contract_id: number

  @column()
  public amount: number

  @column()
  public due_date: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Facture, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'fee_id'
  })
  public facture: HasOne<typeof Facture>

  @belongsTo(() => Contract, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'contract_id'
  })
  public contract: BelongsTo<typeof Contract>
}
