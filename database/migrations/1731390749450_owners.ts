import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Owners extends BaseSchema {
  protected tableName = 'owners'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID auto incremental
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE') // Relación con Usuario
      table.integer('driver_id').unsigned().references('drivers.id').onDelete('CASCADE') // Relación con Conductor
      table.string('address').nullable() // Dirección (heredado de Driver)
      table.timestamp('created_at').defaultTo(this.now()) // Fecha de creación
      table.timestamp('updated_at').defaultTo(this.now()) // Fecha de última actualización
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

