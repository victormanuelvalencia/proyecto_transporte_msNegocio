import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import DirListOrder from './DirListOrder'
import Rute from './Rute'

export default class Lot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public total_weight: number

  @column()
  public dir_list_order_id:number
  
  @column()
  public rute_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Product, {
    foreignKey: 'lot_id'
  })
  public product: HasMany<typeof Product>

  @belongsTo(() => DirListOrder, {
    foreignKey: 'dir_list_order_id'
  })
  public dirListOrder: BelongsTo<typeof DirListOrder>

  @belongsTo(() => Rute, {
    foreignKey: 'rute_id'
  })
  public rute: BelongsTo<typeof Rute>
}
