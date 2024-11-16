
import { column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class Restaurant extends Service {
  
  @column()
  public meal_type:string
}
