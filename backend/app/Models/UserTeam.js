'use strict'

const Model = use('Model')

class UserTeam extends Model {
  user () {
    return this.belongsTo('App/Models/Users')
  }
}

module.exports = UserTeam
