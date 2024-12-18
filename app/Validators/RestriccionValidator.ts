import { schema, rules } from '@ioc:Adonis/Core/Validator'


export default class RestriccionValidator {
  public schema = schema.create({
    descripcion: schema.string({}, [
      rules.maxLength(255), 
      rules.regex(/^[^<>]+$/)
    ]),

    fecha_inicio: schema.date({ format: 'dd/MM/yyyy' }, [
      rules.beforeField('fecha_fin')
    ]),

    fecha_fin: schema.date({ format: 'dd/MM/yyyy' }, [
      rules.afterField('fecha_inicio')
    ]),

    municipality_id: schema.number([
      rules.exists({ table: 'municipalities', column: 'id' })
    ]),
  })

  public messages = {
    'descripcion.required': 'La descripción es obligatoria.',
    'descripcion.maxLength': 'La descripción no puede tener más de 255 caracteres.',
    'descripcion.regex': 'La descripción contiene caracteres no permitidos (<, >).',
    'fecha_inicio.required': 'La fecha de inicio es obligatoria.',
    'fecha_inicio.beforeField': 'La fecha de inicio debe ser anterior a la fecha de fin.',
    'fecha_inicio.date.format': 'La fecha de inicio debe estar en el formato día/mes/año (dd/MM/yyyy).',
    'fecha_fin.required': 'La fecha de fin es obligatoria.',
    'fecha_fin.afterField': 'La fecha de fin debe ser posterior a la fecha de inicio.',
    'fecha_fin.date.format': 'La fecha de fin debe estar en el formato día/mes/año (dd/MM/yyyy).',
    'municipality_id.required': 'El municipio es obligatorio.',
    'municipality_id.exists': 'El municipio seleccionado no existe.',
  }
}
