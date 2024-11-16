import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('street')
      table.string('street_number')
      table.string('reference_point')
      
      table.integer('distributionCenter_id')
                                    .unsigned()
                                    .references('distribution_centers.id')
                                    .onDelete('CASCADE')   

      table.integer('municipality_id')
                                    .unsigned()
                                    .references('municipalities.id')
                                    .onDelete('CASCADE')    
                                                      
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }
}
