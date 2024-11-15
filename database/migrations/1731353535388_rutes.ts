import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'rutes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('distance')
      table.integer('count_distribution_centers')
      table.integer('average_time')
      table.integer('contract_id').unsigned().references('contracts.id').onDelete('CASCADE')
      table.integer('vehicle_id').unsigned().references('vehicles.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
