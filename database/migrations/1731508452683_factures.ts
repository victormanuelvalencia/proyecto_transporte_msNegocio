import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'factures'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('amount').notNullable()
      table.date('date').notNullable()
      table.integer('expense_id').unsigned().references('id').inTable('expenses').onDelete('CASCADE')
      table.integer('fee_id').unsigned().references('id').inTable('fees').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
