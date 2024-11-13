import Shift from './Shift';
import User from './User';
import { column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';

export default class Driver extends User {
  @column()
  public license_number: string; // Atributo específico para conductores

  // Métodos específicos para conductores si es necesario

  // Relación con turnos (uno a muchos)
  @hasMany(() => Shift, {
    foreignKey: 'shift_id'
  })
  public shifts: HasMany<typeof Shift>
}