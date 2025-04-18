import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'lots'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
     // table.integer('category_id').unsigned().references('categories.id').onDelete('CASCADE')
     // table.json('products').notNullable()
     // table.integer('total_products').notNullable()
      table.float('total_weight').notNullable()
      table.integer('dir_list_order_id').unsigned().references('dir_list_orders.id').onDelete('CASCADE')
      table.integer('rute_id').unsigned().references('rutes.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
