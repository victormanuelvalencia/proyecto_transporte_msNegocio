import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Lot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public category: string

  @column({
    serializeAs: 'products',
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: any) => JSON.parse(value),
  })
  public products: string[]

  @column()
  public total_products: number

  @column()
  public total_weight: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
