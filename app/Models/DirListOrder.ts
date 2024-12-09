import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Rute from './Rute'
import Lot from './Lot'
import SecAddress from './SecAddress'

export default class DirListOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public origin: string

  @column()
  public destination: string

  @column()
  public rute_id: number

  @column()
  public sec_address_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Rute, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'rute_id'
  })
  public rute: BelongsTo<typeof Rute>

  @belongsTo(() => SecAddress, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'sec_address_id'
  })
  public address: BelongsTo<typeof SecAddress>

  @hasOne(() => Lot, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'dir_list_order_id'
  })
  public lot: HasOne<typeof Lot>
}
