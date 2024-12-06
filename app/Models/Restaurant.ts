
import { column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Administrator from './Administrator'
import Expense from './Expense'

export default class Restaurant extends Service {
  @column()
  public meal_type:string

  @hasOne(() => Administrator, {
    foreignKey: 'restaurant_id',
  })
  public administrator: HasOne<typeof Administrator>

  @hasMany(() => Expense, {
    foreignKey: 'restaurant_id'
  })
  public expense: HasMany<typeof Expense>
}
