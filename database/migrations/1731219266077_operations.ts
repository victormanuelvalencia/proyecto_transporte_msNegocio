import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'operations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.date('date')
      table.string('operation_type')
      table.boolean('state')
      table.integer('municipality_id')
                                    .unsigned()
                                    .references('municipalities.id')
                                    .onDelete('CASCADE') 
      table.integer('vehicle_id')
                                    .unsigned()
                                    .references('vehicles.id')
                                    .onDelete('CASCADE') 
    
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
