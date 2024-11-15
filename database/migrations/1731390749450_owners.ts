import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Owners extends BaseSchema {
  protected tableName = 'owners'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID auto incremental
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE') // Clave foránea con ''users'
      table.integer('driver_id').unsigned().references('drivers.id').onDelete('CASCADE') // Clave foránea con 'drivers'
      table.integer('rating').notNullable().defaultTo(0)
      table.timestamp('created_at') 
      table.timestamp('updated_at') 
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}