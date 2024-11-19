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
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'rute_id'
  })
  public dirListOrder: HasMany<typeof DirListOrder>

  @hasMany(() => Lot, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'rute_id'
  })
  public lot: HasMany<typeof Lot>

  @belongsTo(() => Contract, {
    //nombre de la clave foranea que permite la relacion, que hace referencia a la que creamos previamente
    foreignKey: 'contract_id'
  })
  public contract: BelongsTo<typeof Contract>

  @belongsTo(() => Vehicle, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'vehicle_id'
  })
  public vehicle: BelongsTo<typeof Vehicle>
}
