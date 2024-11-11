import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Rute from './Rute'
import Address from './Address'

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
  public address_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Rute, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'rute_id'
  })
  public rute: BelongsTo<typeof Rute>

  @belongsTo(() => Address, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'address_id'
  })
  public address: BelongsTo<typeof Address>
}
