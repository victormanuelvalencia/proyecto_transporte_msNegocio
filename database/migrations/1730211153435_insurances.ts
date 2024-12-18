import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'insurances';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('policy_number').notNullable();
      table.date('expiration_date').notNullable();
      table.integer('vehicle_id').unsigned().nullable().references('id').inTable('vehicles').onDelete('CASCADE')
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

