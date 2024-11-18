import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Expense from './Expense'
import Administrator from './Administrator'


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
/*
  @hasMany(() => Expense, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'service_id'
  })
  public expense: HasMany<typeof Expense>
  
  @hasOne(() => Administrator, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'service_id'
  })
  public administrator: HasOne<typeof Administrator>
  */
}
