'use strict'

const Schema = use('Schema')

class UserTeamSchema extends Schema {
  up () {
    this.create('user_teams', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('user_teams')
  }
}

module.exports = UserTeamSchema
