import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Vehicles extends BaseSchema {
  protected tableName = 'vehicles'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // ID auto incremental
      table.string('license_plate').notNullable() // Placa del vehículo
      table.string('type_vehicle').notNullable() // Tipo de vehículo
      table.integer('insurance_id').unsigned().nullable().references('id').inTable('insurances').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}