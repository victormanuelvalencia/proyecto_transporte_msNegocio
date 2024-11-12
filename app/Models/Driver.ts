import User from './User';
import { column } from '@ioc:Adonis/Lucid/Orm';

export default class Driver extends User {
  @column()
  public licenseNumber: string; // Atributo específico para conductores

  // Métodos específicos para conductores si es necesario
}

