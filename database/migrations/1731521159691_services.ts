import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('service_name')
      table.string('location')
      table.string('description')
    
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
