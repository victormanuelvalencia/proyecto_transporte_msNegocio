import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'owner_vehicles';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('owner_id').unsigned().references('id').inTable('owners').onDelete('CASCADE');
      table.integer('vehicle_id').unsigned().references('id').inTable('vehicles').onDelete('CASCADE');
      table.date('ownership_date').notNullable();
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
