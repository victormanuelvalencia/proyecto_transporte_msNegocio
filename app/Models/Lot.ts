import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import DirListOrder from './DirListOrder'
import Rute from './Rute'

export default class Lot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({
    serializeAs: 'products',
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: any) => JSON.parse(value),
  })
  public product: string[]

  @column()
  public total_products: number

  @column()
  public total_weight: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'lot_id'
  })
  public seats: HasMany<typeof Product>

  @belongsTo(() => DirListOrder, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'dir_list_order_id'
  })
  public dirListOrder: BelongsTo<typeof DirListOrder>

  @belongsTo(() => Rute, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'rute_id'
  })
  public rute: BelongsTo<typeof Rute>
}
