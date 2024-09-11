// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class DashboardUsersController {
  async index({ inertia }: HttpContext) {
    const users = await User.query().preload('roles').paginate(1, 10)
    return inertia.render('dashboard/users/index', { users })
  }
}
