import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class ShiftValidator {
  public schema = schema.create({
    driver_id: schema.number([
      rules.exists({ table: 'drivers', column: 'id' }), // Verifica que el ID de conductor exista en la tabla de drivers
    ]),
    start_time: schema.string({}, [
      rules.regex(/^\d{2}:\d{2}$/), // Verifica que el formato sea HH:mm
    ]),
    end_time: schema.string({}, [
      rules.regex(/^\d{2}:\d{2}$/), // Verifica que el formato sea HH:mm
    ]),
    date: schema.string({}, [
      rules.regex(/^\d{4}-\d{2}-\d{2}$/), // Verifica que el formato sea YYYY-MM-DD
    ]),
  })

  public messages = {
    'driver_id.required': 'El campo driver_id es obligatorio.',
    'driver_id.exists': 'El driver_id debe existir en la base de datos.',
    'start_time.required': 'El campo start_time es obligatorio.',
    'start_time.regex': 'El campo start_time debe tener el formato HH:mm.',
    'end_time.required': 'El campo end_time es obligatorio.',
    'end_time.regex': 'El campo end_time debe tener el formato HH:mm.',
    'date.required': 'El campo date es obligatorio.',
    'date.regex': 'El campo date debe tener el formato YYYY-MM-DD.',
  }
}
