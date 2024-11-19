import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'dir_list_orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('origin')
      table.string('destination')
      table.integer('rute_id')
                              .unsigned()
                              .references('rutes.id')
                              .onDelete('CASCADE')
      table.integer('address_id')
                              .unsigned()
                              .references('address2s.id')
                              .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
