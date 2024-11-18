import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'factures'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('card_number') 
      table.string('exp_year') 
      table.string('exp_month') 
      table.string('cvc') 
      table.string('name') 
      table.string('last_name') 
      table.string('email') 
      table.string('phone') 
      table.string('doc_number') 
      table.string('city') 
      table.string('address') 
      table.string('cell_phone') 
      table.string('bill') 
      table.integer('value')
      table.integer('expense_id').unsigned().references('expenses.id').onDelete('CASCADE')
      table.integer('fee_id').unsigned().references('fees.id').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
