import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Department from './Department'
import DistributionCenter from './DistributionCenter'
import Operation from './Operation'
import SecAddress from './SecAddress'
import Restriccion from './Restriccion'

export default class Municipality extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name:string

  @column()
  public zip_code:number

  @column()
  public department_id:number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Department, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'department_id'
  })
  public department: BelongsTo<typeof Department>

  @hasMany(() => SecAddress, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'municipality_id'
  })
  public address: HasMany<typeof SecAddress>

  @hasMany(() => DistributionCenter, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'municipality_id'
  })
  public distributionCenter: HasMany<typeof DistributionCenter>

  @hasMany(() => Operation, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'municipality_id'
  })
  public operation: HasMany<typeof Operation>
  
  @hasMany(() => Restriccion, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'municipality_id'
  })
  public restriccion: HasMany<typeof Restriccion>
}
