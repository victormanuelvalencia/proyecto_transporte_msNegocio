
import { column } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'

export default class Hotel extends Service {
  @column()
  public total_nights:number

  @column()
  public room_type:string
}
