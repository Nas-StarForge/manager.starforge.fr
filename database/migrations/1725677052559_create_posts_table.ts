import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id')
      table.string('title').notNullable()
      table.json('content').nullable()
      table.json('image_url').nullable()
      table.string('user_id').references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('published_at').nullable()
      table.enum('status', ['draft', 'publish']).defaultTo('draft').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
