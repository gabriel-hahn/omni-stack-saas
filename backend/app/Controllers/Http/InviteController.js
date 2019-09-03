'use strict'

class InviteController {
  async store ({ request, response }) {
    console.log(request.team)
  }
}

module.exports = InviteController
