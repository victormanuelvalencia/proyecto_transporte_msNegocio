import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Owners extends BaseSchema {
  protected tableName = 'owners'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID auto incremental
      table.string('license_number').notNullable()
      table.date('license_expiry')
      table.string('user_id')
      table.integer('rating').notNullable().defaultTo(0)
      table.timestamp('created_at', { useTz: true }) 
      table.timestamp('updated_at', { useTz: true }) 
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}