import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'shifts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // Relación con conductor
      table.integer('driver_id').unsigned().references('id').inTable('drivers').onDelete('CASCADE') 
      table.string('start_time').notNullable()
      table.string('end_time').notNullable()
      table.date('date').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}