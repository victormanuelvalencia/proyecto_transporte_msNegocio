import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'
import DistributionCenter from './DistributionCenter'
import DirListOrder from './DirListOrder'

export default class SecAddress extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  
  @column()
  public street: string

  @column()
  public street_number: string

  @column()
  public reference_point: string

  @column()
  public municipality_id: number

  @column()
  public distribution_center_id: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  
  @belongsTo(() => Municipality, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'municipality_id'
  })
  public municipality: BelongsTo<typeof Municipality>

  @belongsTo(() => DistributionCenter, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'distribution_center_id'
  })
  public distributionCenter: BelongsTo<typeof DistributionCenter>

  @hasMany(() => DirListOrder, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'address_id'
  })
  public dirListOrder: HasMany<typeof DirListOrder>
}
