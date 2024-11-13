import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id'); // Identificador único
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('phone_number').nullable(); // Atributo opcional
      table.string('address').nullable(); // Atributo opcional
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}