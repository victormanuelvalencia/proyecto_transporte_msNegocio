import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import DirListOrder from './DirListOrder'
import Lot from './Lot'

export default class Rute extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public distance: number

  @column()
  public count_distribution_centers: number

  @column()
  public average_time: number

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
}
