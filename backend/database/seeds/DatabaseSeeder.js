'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User')

class DatabaseSeeder {
  async run () {
    const user = await User.create({
      name: 'Gabriel Hahn Schaeffer',
      email: 'gabriel_hahn@hotmail.com',
      password: '123456'
    })

    await user.teams().create({
      name: 'Gabriel Company',
      user_id: user.id
    })
  }
}

module.exports = DatabaseSeeder
