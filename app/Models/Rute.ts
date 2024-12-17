import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import DirListOrder from './DirListOrder'
import Lot from './Lot'
import Contract from './Contract'
import Vehicle from './Vehicle'

export default class Rute extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public distance: number

  @column()
  public count_distribution_centers: number

  @column()
  public average_time: number

  @column()
  public contract_id:number
  
  @column()
  public vehicle_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => DirListOrder, {
    foreignKey: 'rute_id'
  })
  public dirListOrder: HasMany<typeof DirListOrder>

  @hasMany(() => Lot, {
    foreignKey: 'rute_id'
  })
  public lot: HasMany<typeof Lot>

  @belongsTo(() => Contract, {
    foreignKey: 'contract_id'
  })
  public contract: BelongsTo<typeof Contract>

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id'
  })
  public vehicle: BelongsTo<typeof Vehicle>
}
