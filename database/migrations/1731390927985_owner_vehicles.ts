import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class OwnerVehicles extends BaseSchema {
  protected tableName = 'owner_vehicles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID auto incremental
      table.integer('owner_id').unsigned().references('owners.id').onDelete('CASCADE') // Relación con Owner
      table.integer('vehicle_id').unsigned().references('vehicles.id').onDelete('CASCADE') // Relación con Vehicle (deberías tener un modelo de Vehicle)
      table.string('ownership_date').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

