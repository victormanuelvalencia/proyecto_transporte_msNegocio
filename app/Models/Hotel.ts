
import { BaseModel, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Administrator from './Administrator'
import Expense from './Expense'

export default class Hotel extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public total_nights:number

  @column()
  public room_type:string

  @hasOne(() => Administrator, {
    foreignKey: 'hotel_id',
  })
  public administrator: HasOne<typeof Administrator>

  @hasMany(() => Expense, {
    foreignKey: 'hotel_id'
  })
  public expense: HasMany<typeof Expense>
}
