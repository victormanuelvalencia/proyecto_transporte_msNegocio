import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column()
  public phoneNumber: string;

  @column()
  public address: string;

  // Relaciones si es necesario
}