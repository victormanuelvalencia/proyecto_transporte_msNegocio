import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vehicles extends BaseSchema {
  protected tableName = 'vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID auto incremental
<<<<<<< HEAD
      table.string('license_plate').notNullable() // Placa del vehículo
      table.string('type_vehicle').notNullable() // Tipo de vehículo
      table.integer('insurance_id').unsigned().nullable().references('id').inTable('insurances').onDelete('CASCADE')
=======
      table.string('license_plate') // Placa del vehículo
      table.string('type_vehicle') // Tipo de vehículo
>>>>>>> d402d68ab82f4981c99c2952c3b400494c6b769a
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}