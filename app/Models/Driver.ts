import Expense from './Expense';
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

  @hasMany(() => Expense, {
    //nombre de la clave foranea que permite la relacion
    foreignKey: 'driver_id'
  })
  public expense: HasMany<typeof Expense>
}