import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Shifts extends BaseSchema {
  protected tableName = 'shifts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      // Relación con conductor
      table.integer('driver_id').unsigned().references('id').inTable('drivers').onDelete('CASCADE') 
      table.string('start_time').notNullable() // Hora de inicio del turno
      table.string('end_time').notNullable() // Hora de fin del turno
      table.date('date').notNullable() // Fecha del turno
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}