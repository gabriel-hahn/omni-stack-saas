'use strict'

const Schema = use('Schema')

class InviteSchema extends Schema {
  up () {
    this.create('invites', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('invites')
  }
}

module.exports = InviteSchema
