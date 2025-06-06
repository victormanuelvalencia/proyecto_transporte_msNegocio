import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DriverVehicles extends BaseSchema {
  protected tableName = 'driver_vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('driver_id').unsigned().references('id').inTable('drivers').onDelete('CASCADE') // Relación con Driver
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles').onDelete('CASCADE') // Relación con Vehicle
      table.integer('owner_id').unsigned().references('owners.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

