import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rutes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('distance')
      table.integer('count_distribution_centers')
      table.integer('average_time')
      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
