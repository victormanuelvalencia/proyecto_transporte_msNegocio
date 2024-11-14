import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm';
import Driver from './Driver';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public password: string;

  @column()
  public user_type: string;
  
  // Relación con 'drivers'
  @hasOne(() => Driver, { // 'driver' tiene un 'user'
    foreignKey: 'user_id', // Establece la clave foránea en la tabla 'driver'
  })
  public driver: HasOne<typeof Driver>;
}