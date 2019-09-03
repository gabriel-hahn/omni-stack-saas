'use strict'

const Schema = use('Schema')

class TeamSchema extends Schema {
  up () {
    this.create('teams', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('teams')
  }
}

module.exports = TeamSchema
