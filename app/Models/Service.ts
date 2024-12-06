import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Administrator from './Administrator'
import Expense from './Expense'


export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public service_name:string

  @column()
  public location:string

  @column()
  public description:string

  @column()
  public total_ammount:number 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Expense, {
    foreignKey: 'service_id'
  })
  public expense: HasMany<typeof Expense>
  
  @hasOne(() => Administrator, {
    foreignKey: 'service_id'
  })
  public administrator: HasOne<typeof Administrator>
}