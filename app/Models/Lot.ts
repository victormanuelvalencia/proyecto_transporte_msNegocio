import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Lot extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public categoria: string

  @column({
    serializeAs: 'productos',
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: any) => JSON.parse(value),
  })
  public productos: string[]

  @column()
  public total_productos: number

  @column()
  public total_peso: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
