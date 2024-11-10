import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Municipality from './Municipality'
import Address from './Address'

export default class DistributionCenter extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public vehicles: string

  @column()
  public municipality_id:number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Address, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'distributionCenter_id'
  })
  public address: HasOne<typeof Address>
  
  @belongsTo(() => Municipality, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'municipality_id'
  })
  public municipality: BelongsTo<typeof Municipality>

}
