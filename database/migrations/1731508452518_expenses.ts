import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('ammount')
      table.string('description')
      table.string('status')
      /*table.integer('service_id')
                                .unsigned()
                                .references('services.id')
                                .onDelete('CASCADE')    */
      table.integer('hotel_id')
                                .unsigned()
                                .references('hotels.id')
                                .onDelete('CASCADE')    
      table.integer('restaurant_id')
                                .unsigned()
                                .references('restaurants.id')
                                .onDelete('CASCADE')    
      table.integer('driver_id')
                                .unsigned()
                                .references('drivers.id')
                                .onDelete('CASCADE')
      table.integer('owner_id')
                                .unsigned()
                                .references('owners.id')
                                .onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
