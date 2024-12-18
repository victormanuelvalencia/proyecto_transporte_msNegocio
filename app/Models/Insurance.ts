import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Vehicle from './Vehicle';

export default class Insurance extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public policy_number: string;

  @column()
  public expiration_date: Date;

  @column()
  public vehicle_id: number;

  @belongsTo(() => Vehicle, {
    foreignKey: 'vehicle_id',  // Establece la relación de clave foránea
  })
  public vehicle: BelongsTo<typeof Vehicle>
}
